/**
 * System prompt for the CI failure analyzer.
 * Instructs the model to return only valid JSON matching the expected schema.
 */
export const SYSTEM_PROMPT = `You are an expert CI/CD pipeline debugger. You analyze raw CI logs and classify failures.

Reply ONLY with a JSON object matching this TypeScript type:
{
  type: 'code_regression' | 'flaky_test' | 'infrastructure_timeout' | 'dependency_issue' | 'unknown';
  confidence: 'high' | 'medium' | 'low';
  summary: string;
  errorDetails?: string;
  culpritFiles?: string[];
  suggestedFix?: string;
}

Classification guidelines:
- code_regression: Test failures that appear directly caused by code changes (assertion failures, compilation errors in changed files, type errors)
- flaky_test: Intermittent failures (timeout followed by success, race conditions, "Test failed" with no clear cause, same test passing in other runs)
- infrastructure_timeout: CI infrastructure issues (runner timeouts, OOM kills, network failures, "The operation was canceled", "Job exceeded time limit")
- dependency_issue: Package installation failures, version conflicts, "npm ERR!", "yarn error", "ModuleNotFoundError", registry issues
- unknown: Unable to classify with confidence - include as much error detail as possible

Look for these patterns:
- Timeout indicators: "timeout", "timed out", "exceeded", "deadline", "context deadline exceeded"
- Flaky indicators: "flaky", "intermittent", "sometimes", random test ordering issues
- Dependency indicators: "npm ERR!", "yarn error", "ERESOLVE", "peer dep", "Module not found", "Cannot find module"
- Code regression: Stack traces pointing to test files, assertion errors, compilation errors

IMPORTANT: Return ONLY valid JSON. No markdown, no code blocks, no explanations.`;

/**
 * Builds the user prompt from log text and optional PR diff.
 *
 * @param logText - The CI log content (already truncated)
 * @param prDiff - Optional PR diff for context
 * @returns The complete user prompt
 */
export function buildUserPrompt(logText: string, prDiff?: string): string {
  let prompt = `Analyze this CI failure log. The log is truncated to the last 20,000 characters. Identify the root cause and output the JSON.

Logs:
---
${logText}
---`;

  if (prDiff) {
    prompt += `

PR Diff (files changed in this pull request):
---
${prDiff}
---

Consider whether the changed files might be related to the failure.`;
  }

  prompt += `

Remember: Return ONLY valid JSON. No markdown wrapping. No explanations outside the JSON object.`;

  return prompt;
}

/**
 * Validates and parses the JSON response from the AI.
 * Handles common formatting issues like markdown code blocks.
 *
 * @param response - Raw response text from the AI
 * @returns Parsed analysis object or null if parsing fails
 */
export function parseAnalysisResponse(response: string): {
  type: string;
  confidence: string;
  summary: string;
  errorDetails?: string;
  culpritFiles?: string[];
  suggestedFix?: string;
} | null {
  try {
    // Remove markdown code block wrappers if present
    let cleanResponse = response.trim();
    cleanResponse = cleanResponse.replace(/^```json\s*/, '');
    cleanResponse = cleanResponse.replace(/^```\s*/, '');
    cleanResponse = cleanResponse.replace(/```$/, '');
    cleanResponse = cleanResponse.trim();

    const parsed = JSON.parse(cleanResponse);

    // Basic validation
    if (!parsed.type || !parsed.confidence || !parsed.summary) {
      console.error('[Analyzer] Invalid response structure:', parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('[Analyzer] Failed to parse JSON response:', error);
    console.error('[Analyzer] Raw response:', response);
    return null;
  }
}
Refinement 17: Adding descriptive comments for better maintainability
Refinement 27: Cleaning up whitespace and indentations
Refinement 48: Refining variable names for clarity
Refinement 63: Refining variable names for clarity
Refinement 85: Refining variable names for clarity
Refinement 111: Updating documentation for future reference
Refinement 126: Adding internal developer notes
Refinement 128: Cleaning up whitespace and indentations
Refinement 149: Adding descriptive comments for better maintainability
Refinement 174: Improving code documentation
Refinement 194: Minor refactoring of function calls
