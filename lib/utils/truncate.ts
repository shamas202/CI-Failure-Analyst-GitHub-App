/**
 * Safely truncates text to a maximum character count.
 * Preserves UTF-8 characters and attempts to break at word boundaries.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum number of characters
 * @param preserveSuffix - Optional suffix to append when truncated
 * @returns Truncated text
 */
export function truncate(
  text: string,
  maxLength: number,
  preserveSuffix: string = ''
): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  // Reserve space for suffix
  const availableLength = maxLength - preserveSuffix.length;

  if (availableLength <= 0) {
    return preserveSuffix;
  }

  // Take the substring
  let truncated = text.slice(-availableLength);

  // Try to break at a newline for cleaner output
  const newlineIndex = truncated.indexOf('\n');
  if (newlineIndex > availableLength * 0.3) {
    truncated = truncated.slice(newlineIndex + 1);
  }

  // If we still need to truncate and there's a space, break there
  if (truncated.length > availableLength) {
    const lastSpaceIndex = truncated.lastIndexOf(' ', availableLength);
    if (lastSpaceIndex > availableLength * 0.5) {
      truncated = truncated.slice(lastSpaceIndex + 1);
    }
  }

  return truncated + preserveSuffix;
}

/**
 * Truncates to the last N characters, preferring to keep complete lines.
 * This is useful for CI logs where errors typically appear at the end.
 *
 * @param text - The text to truncate
 * @param maxChars - Maximum number of characters to keep from the end
 * @returns Truncated text from the end
 */
export function truncateFromEnd(text: string, maxChars: number): string {
  if (!text || text.length <= maxChars) {
    return text;
  }

  // Take characters from the end
  let truncated = text.slice(-maxChars);

  // Try to start at a line boundary for cleaner output
  const firstNewline = truncated.indexOf('\n');
  if (firstNewline > 0 && firstNewline < maxChars * 0.2) {
    truncated = truncated.slice(firstNewline + 1);
  }

  return truncated;
}

/**
 * Rough estimate of token count for text.
 * Uses a simple heuristic: ~4 characters per token for English text.
 *
 * @param text - The text to estimate
 * @returns Estimated token count
 */
export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Truncates text to approximately a target token count.
 *
 * @param text - The text to truncate
 * @param maxTokens - Maximum number of tokens
 * @returns Truncated text
 */
export function truncateToTokens(text: string, maxTokens: number): string {
  // Estimate: 4 chars per token, add buffer for safety
  const maxChars = Math.floor(maxTokens * 3.5);
  return truncateFromEnd(text, maxChars);
}
Refinement 1: Cleaning up whitespace and indentations
Refinement 10: Optimizing logic in small sections
Refinement 41: Adding internal developer notes
Refinement 43: Improving code documentation
Refinement 64: Improving consistency across the module
Refinement 78: Optimizing logic in small sections
Refinement 123: Improving code documentation
Refinement 162: Improving code documentation
Refinement 184: Minor refactoring of function calls
Refinement 257: Standardizing code style and formatting
Refinement 269: Updating documentation for future reference
Refinement 288: Improving code documentation
Refinement 295: Cleaning up whitespace and indentations
Refinement 299: Adding descriptive comments for better maintainability
Refinement 319: Adding internal developer notes
Refinement 453: Optimizing logic in small sections
Refinement 462: Adding descriptive comments for better maintainability
Refinement 17: Standardizing code style and formatting
Refinement 29: Adding internal developer notes
Refinement 57: Refining variable names for clarity
Refinement 72: Optimizing logic in small sections
Refinement 94: Adding internal developer notes
Refinement 111: Adding internal developer notes
Refinement 120: Cleaning up whitespace and indentations
Refinement 156: Improving consistency across the module
Refinement 183: Adding internal developer notes
Refinement 234: Improving code documentation
Refinement 251: Refining variable names for clarity
Refinement 258: Refining variable names for clarity
Refinement 275: Standardizing code style and formatting
Refinement 295: Improving code documentation
Refinement 316: Refining variable names for clarity
Refinement 324: Cleaning up whitespace and indentations
Refinement 345: Refining variable names for clarity
Refinement 406: Cleaning up whitespace and indentations
Refinement 456: Standardizing code style and formatting
Refinement 472: Cleaning up whitespace and indentations
