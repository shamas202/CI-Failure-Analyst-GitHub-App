import { NextRequest, NextResponse } from 'next/server';
import { GitHubWebhookPayload, FailureAnalysis } from '@/lib/types';
import { verifyWebhookSignature, getWebhookEventType } from '@/lib/webhook/verification';
import { getOctokit } from '@/lib/github/client';
import { fetchCiLogs, fetchPRDiff } from '@/lib/github/logs';
import { analyzeFailure } from '@/lib/analyzer/classifier';

/**
 * GET endpoint for health checks.
 * Useful for Vercel deployment verification and uptime monitoring.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}

/**
 * POST endpoint for GitHub webhook events.
 * Handles check_run events and analyzes CI failures using AI.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  const logPrefix = `[Webhook] ${new Date().toISOString()}`;

  console.log(`${logPrefix} Received webhook request`);

  try {
    // Get headers
    const signature = request.headers.get('x-hub-signature-256');
    const githubEvent = request.headers.get('x-github-event');
    const githubDelivery = request.headers.get('x-github-delivery');

    console.log(`${logPrefix} Event: ${githubEvent}, Delivery: ${githubDelivery}`);

    // Read raw body for signature verification
    const rawBody = await request.text();

    // Verify webhook signature
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!verifyWebhookSignature(rawBody, signature ?? undefined, webhookSecret || '')) {
      console.warn(`${logPrefix} Invalid webhook signature`);
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 401 }
      );
    }

    console.log(`${logPrefix} Signature verified`);

    // Check event type
    const eventType = getWebhookEventType(githubEvent ?? undefined);
    if (eventType !== 'check_run') {
      console.log(`${logPrefix} Ignoring non-check_run event: ${eventType}`);
      return NextResponse.json({ success: true, message: 'Event ignored' });
    }

    // Parse JSON body
    let payload: GitHubWebhookPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch (error) {
      console.error(`${logPrefix} Failed to parse JSON:`, error);
      return NextResponse.json(
        { success: false, error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // Check if this is a completed check run with failure
    const { action, check_run } = payload;

    if (action !== 'completed') {
      console.log(`${logPrefix} Ignoring action: ${action}`);
      return NextResponse.json({ success: true, message: 'Action ignored' });
    }

    if (check_run.conclusion !== 'failure' && check_run.conclusion !== 'timed_out') {
      console.log(`${logPrefix} Ignoring conclusion: ${check_run.conclusion}`);
      return NextResponse.json({ success: true, message: 'Conclusion ignored' });
    }

    console.log(`${logPrefix} Processing failed check run: ${check_run.id}`);

    // Extract repository info
    const { repository, installation, check_run: checkRun } = payload;
    const [owner, repo] = repository.full_name.split('/');

    if (!owner || !repo) {
      console.error(`${logPrefix} Invalid repository name: ${repository.full_name}`);
      return NextResponse.json({ success: true, message: 'Invalid repository' });
    }

    // Get PR number if available
    const prNumber = checkRun.pull_requests?.[0]?.number;
    const prInfo = prNumber ? ` PR #${prNumber}` : '';
    console.log(`${logPrefix} Repository: ${repository.full_name}${prInfo}`);

    // Get authenticated GitHub client
    const octokit = await getOctokit(installation.id);

    // Fetch CI logs
    let logText: string;
    try {
      logText = await fetchCiLogs(octokit, owner, repo, checkRun.id);
    } catch (error) {
      console.error(`${logPrefix} Failed to fetch CI logs:`, error);
      // Continue without logs - we'll still try to analyze with available info
      logText = 'Unable to fetch CI logs. Check run status: ' + checkRun.conclusion;
    }

    // Fetch PR diff if PR is available
    let prDiff: string | undefined;
    if (prNumber) {
      try {
        prDiff = await fetchPRDiff(octokit, owner, repo, prNumber);
      } catch (error) {
        console.warn(`${logPrefix} Failed to fetch PR diff:`, error);
        prDiff = undefined;
      }
    }

    // Analyze the failure
    console.log(`${logPrefix} Running AI analysis...`);
    const analysis: FailureAnalysis = await analyzeFailure(logText, prDiff);

    console.log(`${logPrefix} Analysis complete: ${analysis.type} (${analysis.confidence})`);

    // Post comment on PR if available
    if (prNumber) {
      try {
        const commentBody = formatAnalysisComment(analysis, repository, checkRun, prNumber);

        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: prNumber,
          body: commentBody,
        });

        console.log(`${logPrefix} Posted analysis comment on PR #${prNumber}`);
      } catch (error) {
        console.error(`${logPrefix} Failed to post PR comment:`, error);
        // Don't fail the webhook - GitHub will retry otherwise
      }
    } else {
      console.log(`${logPrefix} No PR associated with check run, skipping comment`);
    }

    const duration = Date.now() - startTime;
    console.log(`${logPrefix} Completed in ${duration}ms`);

    return NextResponse.json({
      success: true,
      message: 'Analysis complete',
      analysis: {
        ...analysis,
        checkRunId: checkRun.id,
        repoFullName: repository.full_name,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`${logPrefix} Error after ${duration}ms:`, error);

    // Always return 200 to prevent GitHub retries for handled errors
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Formats the AI analysis as a GitHub-flavored markdown comment.
 */
function formatAnalysisComment(
  analysis: FailureAnalysis,
  repository: { full_name: string; html_url: string },
  checkRun: { id: number; name: string; details_url?: string },
  prNumber: number
): string {
  const confidenceEmoji =
    analysis.confidence === 'high'
      ? '✅'
      : analysis.confidence === 'medium'
      ? '⚠️'
      : '❓';

  const typeLabel = formatFailureType(analysis.type);

  let comment = `## 🤖 CI Failure Analysis

| Field | Value |
|-------|-------|
| **Failure Type** | ${confidenceEmoji} ${typeLabel} |
| **Confidence** | ${analysis.confidence} |
| **Check Run** | [\`${checkRun.name}\`](${checkRun.details_url || '#'}) |

### Summary

${analysis.summary}

${analysis.errorDetails ? `### Error Details

\`\`\`
${truncateForComment(analysis.errorDetails)}
\`\`\`

` : ''}${analysis.culpritFiles && analysis.culpritFiles.length > 0 ? `### Possible Culprit Files

${analysis.culpritFiles.map((f) => `- \`${f}\``).join('\n')}

` : ''}${analysis.suggestedFix ? `### Suggested Fix

${analysis.suggestedFix}

` : ''}${formatRerunLink(checkRun, repository.html_url)}
---
*🤖 This analysis was generated by an AI assistant. Please verify before applying suggestions.*`;

  return comment;
}

/**
 * Formats the failure type as a human-readable label.
 */
function formatFailureType(type: FailureAnalysis['type']): string {
  const labels: Record<string, string> = {
    code_regression: '🐛 Code Regression',
    flaky_test: '🎲 Flaky Test',
    infrastructure_timeout: '⏱️ Infrastructure Timeout',
    dependency_issue: '📦 Dependency Issue',
    unknown: '🔍 Unknown',
  };
  return labels[type] || type;
}

/**
 * Adds a rerun link for flaky tests or timeouts.
 */
function formatRerunLink(
  checkRun: { id: number; details_url?: string },
  repoUrl: string
): string {
  // Try to extract run ID from details_url
  const detailsUrl = checkRun.details_url || '';
  const runMatch = detailsUrl.match(/\/runs\/(\d+)/);
  const runId = runMatch ? runMatch[1] : null;

  if (runId) {
    const rerunUrl = `${repoUrl}/actions/runs/${runId}`;
    return `### Actions

You can [re-run the failed job](${rerunUrl}) or [view all runs](${repoUrl}/actions).`;
  }

  return '';
}

/**
 * Truncates text for display in a GitHub comment.
 */
function truncateForComment(text: string, maxLength: number = 2000): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '\n\n...(truncated)';
}
Refinement 13: Adding internal developer notes
Refinement 56: Optimizing logic in small sections
Refinement 59: Improving consistency across the module
Refinement 80: Refining variable names for clarity
Refinement 81: Improving consistency across the module
Refinement 86: Adding internal developer notes
Refinement 93: Adding descriptive comments for better maintainability
Refinement 95: Cleaning up whitespace and indentations
Refinement 97: Improving consistency across the module
Refinement 121: Refining variable names for clarity
Refinement 197: Improving code documentation
Refinement 237: Updating documentation for future reference
Refinement 242: Cleaning up whitespace and indentations
Refinement 311: Cleaning up whitespace and indentations
Refinement 338: Cleaning up whitespace and indentations
Refinement 346: Adding descriptive comments for better maintainability
