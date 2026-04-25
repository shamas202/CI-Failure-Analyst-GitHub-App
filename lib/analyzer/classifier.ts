import Anthropic from '@anthropic-ai/sdk';
import { FailureAnalysis } from '../types';
import { SYSTEM_PROMPT, buildUserPrompt, parseAnalysisResponse } from './prompt';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Analyzes CI failure logs using Anthropic's Claude 3 Haiku model.
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

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    // Extract text content from the response
    const textContent = response.content.find((block) => block.type === 'text');

    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in AI response');
    }

    const analysis = parseAnalysisResponse(textContent.text);

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
