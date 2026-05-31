import { Octokit } from '@octokit/rest';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';
import { extract as tarExtract } from 'tar-stream';
import { truncateFromEnd } from '../utils/truncate';

/**
 * Parsed log file entry
 */
interface LogFileEntry {
  name: string;
  content: string;
}

/**
 * Extracts the workflow run ID from a check run's details URL.
 * Example URL: https://api.github.com/repos/owner/repo/actions/runs/12345/jobs
 */
function extractRunIdFromDetailsUrl(detailsUrl: string): number | null {
  const match = detailsUrl.match(/\/runs\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Fetches CI logs for a failed check run.
 * Downloads the log zip from GitHub Actions, extracts text files,
 * and returns the concatenated content truncated to the last 20,000 characters.
 *
 * @param octokit - Authenticated Octokit client
 * @param owner - Repository owner (user or org)
 * @param repo - Repository name
 * @param checkRunId - The check run ID
 * @returns Concatenated log content
 */
export async function fetchCiLogs(
  octokit: Octokit,
  owner: string,
  repo: string,
  checkRunId: number
): Promise<string> {
  console.log(`[CI Logs] Fetching logs for ${owner}/${repo} check run ${checkRunId}`);

  try {
    // First, get the check run details to find the workflow run
    const { data: checkRun } = await octokit.checks.get({
      owner,
      repo,
      check_run_id: checkRunId,
    });

    let workflowRunId: number | null = null;

    // Method 1: Try to get workflow run ID from check suite
    // Type assertion needed because Octokit types don't include workflow_run
    const checkSuite = checkRun.check_suite as { id: number; workflow_run?: { id: number } } | null;
    if (checkSuite?.workflow_run?.id) {
      workflowRunId = checkSuite.workflow_run.id;
      console.log(`[CI Logs] Found workflow run ID from check_suite: ${workflowRunId}`);
    }

    // Method 2: Parse from details_url
    if (!workflowRunId && checkRun.details_url) {
      workflowRunId = extractRunIdFromDetailsUrl(checkRun.details_url);
      if (workflowRunId) {
        console.log(`[CI Logs] Found workflow run ID from details_url: ${workflowRunId}`);
      }
    }

    // Method 3: Search by head SHA
    if (!workflowRunId) {
      console.log(`[CI Logs] No workflow run ID found, searching by head SHA: ${checkRun.head_sha}`);
      return await fetchLogsByHeadSha(octokit, owner, repo, checkRun.head_sha);
    }

    // Download the logs zip (returns ArrayBuffer directly)
    const logsZip = await octokit.actions.downloadWorkflowRunLogs({
      owner,
      repo,
      run_id: workflowRunId,
    });

    if (!logsZip || !(logsZip instanceof ArrayBuffer)) {
      throw new Error('Failed to download logs: empty response');
    }

    // Extract text files from the zip
    const logFiles = await extractLogFiles(Buffer.from(logsZip as ArrayBuffer));

    if (logFiles.length === 0) {
      throw new Error('No log files found in archive');
    }

    // Concatenate all log files with separators
    const allLogs = logFiles
      .map((f) => `=== ${f.name} ===\n${f.content}`)
      .join('\n\n');

    // Truncate to last 20,000 characters (errors usually at the end)
    const truncatedLogs = truncateFromEnd(allLogs, 20000);

    console.log(`[CI Logs] Extracted ${logFiles.length} log files, truncated to ${truncatedLogs.length} chars`);

    return truncatedLogs;
  } catch (error) {
    console.error(`[CI Logs] Error fetching logs:`, error);
    throw error;
  }
}

/**
 * Alternative method to fetch logs using head_sha when workflow_run is not available.
 */
async function fetchLogsByHeadSha(
  octokit: Octokit,
  owner: string,
  repo: string,
  headSha: string
): Promise<string> {
  console.log(`[CI Logs] Fetching logs by head SHA: ${headSha}`);

  // List workflow runs for the repo filtered by head_sha
  const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    head_sha: headSha,
    per_page: 10,
  });

  if (runs.workflow_runs.length === 0) {
    throw new Error(`No workflow runs found for SHA ${headSha}`);
  }

  // Get the most recent run
  const latestRun = runs.workflow_runs[0];

  console.log(`[CI Logs] Found workflow run ${latestRun.id} (${latestRun.name})`);

  const { data: logsZip } = await octokit.actions.downloadWorkflowRunLogs({
    owner,
    repo,
    run_id: latestRun.id,
  });

  const logFiles = await extractLogFiles(Buffer.from(logsZip as ArrayBuffer));

  const allLogs = logFiles
    .map((f) => `=== ${f.name} ===\n${f.content}`)
    .join('\n\n');

  return truncateFromEnd(allLogs, 20000);
}

/**
 * Extracts text files from a zip buffer.
 * GitHub Actions logs are gzipped tarballs containing .txt files.
 */
async function extractLogFiles(zipBuffer: Buffer): Promise<LogFileEntry[]> {
  const logFiles: LogFileEntry[] = [];

  return new Promise((resolve, reject) => {
    const extractor = tarExtract();

    extractor.on('entry', (header, stream, next) => {
      // Only process .txt files (GitHub Actions log files)
      if (header.name.endsWith('.txt')) {
        const chunks: Buffer[] = [];

        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => {
          const content = Buffer.concat(chunks).toString('utf-8');
          logFiles.push({
            name: header.name,
            content,
          });
          next();
        });

        stream.on('error', (err) => {
          console.error(`[CI Logs] Error extracting ${header.name}:`, err);
          next();
        });
      } else {
        stream.resume();
        stream.on('end', next);
      }
    });

    extractor.on('finish', () => {
      console.log(`[CI Logs] Extracted ${logFiles.length} log files from archive`);
      resolve(logFiles);
    });

    extractor.on('error', (err) => {
      console.error('[CI Logs] Archive extraction error:', err);
      reject(err);
    });

    // Handle gzip-compressed content
    const zipStream = Readable.from(zipBuffer);
    const gunzip = createGunzip();

    pipeline(zipStream, gunzip, extractor).catch((err) => {
      console.error('[CI Logs] Pipeline error:', err);
      reject(err);
    });
  });
}

/**
 * Fetches the diff for a pull request.
 * Used to provide context for failure analysis.
 *
 * @param octokit - Authenticated Octokit client
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param prNumber - Pull request number
 * @returns The PR diff as text
 */
export async function fetchPRDiff(
  octokit: Octokit,
  owner: string,
  repo: string,
  prNumber: number
): Promise<string> {
  console.log(`[CI Logs] Fetching diff for PR #${prNumber}`);

  try {
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
      per_page: 100,
    });

    if (!files || files.length === 0) {
      return 'No files changed in PR';
    }

    // Format diff in a readable way
    const diff = files
      .map((file) => {
        const status = file.status === 'added' ? '+ADDED' :
                       file.status === 'removed' ? '-REMOVED' :
                       file.status === 'renamed' ? '~RENAMED' : 'M';
        return `${status}: ${file.filename}`;
      })
      .join('\n');

    console.log(`[CI Logs] PR #${prNumber} has ${files.length} changed files`);

    return diff;
  } catch (error) {
    console.error(`[CI Logs] Error fetching PR diff:`, error);
    return 'Unable to fetch PR diff';
  }
}
Refinement 0: Minor refactoring of function calls
Refinement 6: Cleaning up whitespace and indentations
Refinement 20: Adding descriptive comments for better maintainability
Refinement 32: Adding internal developer notes
Refinement 57: Updating documentation for future reference
Refinement 61: Updating documentation for future reference
Refinement 75: Cleaning up whitespace and indentations
Refinement 92: Minor refactoring of function calls
Refinement 146: Updating documentation for future reference
Refinement 153: Improving consistency across the module
Refinement 180: Adding descriptive comments for better maintainability
Refinement 200: Cleaning up whitespace and indentations
Refinement 213: Improving consistency across the module
Refinement 222: Adding descriptive comments for better maintainability
Refinement 254: Refining variable names for clarity
Refinement 258: Adding descriptive comments for better maintainability
Refinement 265: Cleaning up whitespace and indentations
Refinement 291: Improving consistency across the module
Refinement 294: Standardizing code style and formatting
Refinement 335: Adding internal developer notes
Refinement 339: Adding descriptive comments for better maintainability
Refinement 362: Optimizing logic in small sections
Refinement 363: Minor refactoring of function calls
Refinement 382: Optimizing logic in small sections
Refinement 391: Optimizing logic in small sections
Refinement 392: Minor refactoring of function calls
Refinement 395: Cleaning up whitespace and indentations
Refinement 411: Improving code documentation
Refinement 34: Optimizing logic in small sections
Refinement 38: Cleaning up whitespace and indentations
Refinement 41: Adding internal developer notes
Refinement 47: Improving consistency across the module
Refinement 62: Adding internal developer notes
Refinement 68: Adding descriptive comments for better maintainability
Refinement 69: Improving code documentation
Refinement 83: Improving code documentation
Refinement 96: Cleaning up whitespace and indentations
Refinement 135: Cleaning up whitespace and indentations
