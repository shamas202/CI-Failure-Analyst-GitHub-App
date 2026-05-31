import { FailureAnalysis } from '../types';
import { SYSTEM_PROMPT, buildUserPrompt, parseAnalysisResponse } from './prompt';

/**
 * Analyzes CI failure logs using OpenRouter API (free models).
 * Returns a structured failure analysis with classification and suggestions.
 *
 * @param logText - The CI log content
 * @param prDiff - Optional PR diff for additional context
 * @returns Failure analysis result
 */
export async function analyzeFailure(
  logText: string,
  prDiff?: string
): Promise<FailureAnalysis> {
  console.log(`[Analyzer] Starting failure analysis (log length: ${logText.length})`);

  const userPrompt = buildUserPrompt(logText, prDiff);

  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error('[Analyzer] OPENROUTER_API_KEY not configured');
    return {
      type: 'unknown',
      confidence: 'low',
      summary: 'AI analysis not configured. Please set OPENROUTER_API_KEY environment variable.',
      errorDetails: 'OPENROUTER_API_KEY environment variable is not set',
    };
  }

  try {
    // Use OpenRouter API with free model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/shamas202/CI-Failure-Analyst-GitHub-App',
        'X-Title': 'CI Failure Analyst',
      },
      body: JSON.stringify({
        // Free model: Meta Llama 3.1 8B Instruct
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No content in AI response');
    }

    const analysis = parseAnalysisResponse(aiResponse);

    if (!analysis) {
      // Fallback: create a basic unknown analysis
      console.warn('[Analyzer] Could not parse AI response, using fallback');
      return {
        type: 'unknown',
        confidence: 'low',
        summary: 'Unable to classify the failure. Review the logs manually.',
        errorDetails: logText.slice(-500), // Last 500 chars as context
      };
    }

    console.log(`[Analyzer] Classification: ${analysis.type} (${analysis.confidence} confidence)`);

    return {
      type: analysis.type as FailureAnalysis['type'],
      confidence: analysis.confidence as FailureAnalysis['confidence'],
      summary: analysis.summary,
      errorDetails: analysis.errorDetails,
      culpritFiles: analysis.culpritFiles,
      suggestedFix: analysis.suggestedFix,
    };
  } catch (error) {
    console.error('[Analyzer] Error during analysis:', error);

    // Return a safe fallback analysis
    return {
      type: 'unknown',
      confidence: 'low',
      summary: 'Analysis failed. Please review the logs manually.',
      errorDetails: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
Refinement 29: Minor refactoring of function calls
Refinement 44: Cleaning up whitespace and indentations
Refinement 50: Adding internal developer notes
Refinement 71: Standardizing code style and formatting
Refinement 82: Improving code documentation
Refinement 88: Refining variable names for clarity
Refinement 107: Improving code documentation
Refinement 115: Refining variable names for clarity
Refinement 135: Minor refactoring of function calls
Refinement 140: Improving code documentation
Refinement 157: Improving consistency across the module
Refinement 158: Adding internal developer notes
Refinement 235: Refining variable names for clarity
Refinement 264: Standardizing code style and formatting
Refinement 273: Adding internal developer notes
Refinement 316: Optimizing logic in small sections
Refinement 318: Improving code documentation
Refinement 340: Standardizing code style and formatting
Refinement 345: Improving consistency across the module
Refinement 424: Improving code documentation
Refinement 432: Optimizing logic in small sections
Refinement 447: Improving code documentation
Refinement 51: Adding internal developer notes
Refinement 81: Improving consistency across the module
Refinement 115: Optimizing logic in small sections
Refinement 158: Standardizing code style and formatting
Refinement 162: Updating documentation for future reference
Refinement 169: Adding descriptive comments for better maintainability
Refinement 171: Cleaning up whitespace and indentations
