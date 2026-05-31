import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verifies the GitHub webhook signature using the shared secret.
 * GitHub sends the signature in the x-hub-signature-256 header.
 *
 * @param body - The raw request body as a string or Buffer
 * @param signature - The x-hub-signature-256 header value
 * @param secret - The webhook secret from environment variables
 * @returns true if the signature is valid, false otherwise
 */
export function verifyWebhookSignature(
  body: string | Buffer,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) {
    console.log('[Webhook Verification] No signature provided');
    return false;
  }

  if (!secret) {
    console.log('[Webhook Verification] No secret configured');
    return false;
  }

  try {
    // GitHub sends signature as "sha256=<hex>"
    const [algorithm, githubHash] = signature.split('=');

    if (algorithm !== 'sha256') {
      console.log('[Webhook Verification] Unknown algorithm:', algorithm);
      return false;
    }

    if (!githubHash) {
      console.log('[Webhook Verification] No hash in signature');
      return false;
    }

    // Compute our own HMAC-SHA256
    const bodyBuffer = Buffer.isBuffer(body) ? body : Buffer.from(body);
    const computedHash = createHmac('sha256', secret)
      .update(bodyBuffer)
      .digest('hex');

    // Use timing-safe comparison to prevent timing attacks
    const githubHashBuffer = Buffer.from(githubHash, 'hex');
    const computedHashBuffer = Buffer.from(computedHash, 'hex');

    if (githubHashBuffer.length !== computedHashBuffer.length) {
      console.log('[Webhook Verification] Hash length mismatch');
      return false;
    }

    const isValid = timingSafeEqual(githubHashBuffer, computedHashBuffer);

    if (!isValid) {
      console.log('[Webhook Verification] Signature mismatch');
    }

    return isValid;
  } catch (error) {
    console.error('[Webhook Verification] Error verifying signature:', error);
    return false;
  }
}

/**
 * Extracts and validates the GitHub webhook event type from headers.
 *
 * @param githubEvent - The x-github-event header value
 * @returns The event type or null if invalid
 */
export function getWebhookEventType(githubEvent: string | undefined): string | null {
  if (!githubEvent) {
    return null;
  }

  // GitHub sometimes sends "ping" events for webhook testing
  if (githubEvent === 'ping') {
    return 'ping';
  }

  // We only care about check_run events
  if (githubEvent === 'check_run') {
    return 'check_run';
  }

  console.log('[Webhook Verification] Unexpected event type:', githubEvent);
  return githubEvent;
}
Refinement 4: Standardizing code style and formatting
Refinement 19: Improving consistency across the module
Refinement 23: Optimizing logic in small sections
Refinement 24: Refining variable names for clarity
Refinement 37: Updating documentation for future reference
Refinement 39: Standardizing code style and formatting
Refinement 52: Updating documentation for future reference
Refinement 53: Minor refactoring of function calls
Refinement 60: Improving code documentation
Refinement 62: Improving code documentation
Refinement 66: Improving code documentation
Refinement 69: Standardizing code style and formatting
Refinement 70: Cleaning up whitespace and indentations
Refinement 83: Adding descriptive comments for better maintainability
Refinement 99: Adding descriptive comments for better maintainability
Refinement 102: Updating documentation for future reference
Refinement 143: Adding internal developer notes
Refinement 144: Cleaning up whitespace and indentations
Refinement 151: Minor refactoring of function calls
Refinement 159: Adding descriptive comments for better maintainability
Refinement 179: Standardizing code style and formatting
Refinement 204: Adding internal developer notes
Refinement 207: Minor refactoring of function calls
Refinement 223: Improving consistency across the module
Refinement 262: Optimizing logic in small sections
Refinement 267: Cleaning up whitespace and indentations
Refinement 274: Updating documentation for future reference
Refinement 275: Refining variable names for clarity
Refinement 276: Standardizing code style and formatting
