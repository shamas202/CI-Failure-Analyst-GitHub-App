import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import { retry } from '@octokit/plugin-retry';

// In-memory cache for installation tokens
interface TokenCacheEntry {
  token: string;
  expiresAt: number;
}

const tokenCache = new Map<number, TokenCacheEntry>();

// Create Octokit class with retry plugin (handles rate limits automatically)
const RetryableOctokit = Octokit.plugin(retry);

/**
 * Gets an authenticated Octokit client for a specific GitHub App installation.
 * Uses installation tokens with in-memory caching to reduce API calls.
 *
 * @param installationId - The GitHub App installation ID
 * @returns Authenticated Octokit client
 */
export async function getOctokit(installationId: number): Promise<Octokit> {
  const cachedEntry = tokenCache.get(installationId);

  // Check if we have a valid cached token (with 5 minute buffer)
  if (cachedEntry && cachedEntry.expiresAt > Date.now() + 5 * 60 * 1000) {
    console.log(`[GitHub Client] Using cached token for installation ${installationId}`);
    return new RetryableOctokit({
      auth: cachedEntry.token,
    });
  }

  console.log(`[GitHub Client] Creating new auth token for installation ${installationId}`);

  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  const clientId = process.env.GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;

  if (!appId || !privateKey) {
    throw new Error('GitHub App credentials not configured');
  }

  // Create app-authenticated Octokit to get installation token
  const appOctokit = new RetryableOctokit({
    authStrategy: createAppAuth,
    auth: {
      appId: parseInt(appId, 10),
      privateKey: formatPrivateKey(privateKey),
      clientId,
      clientSecret,
    },
  });

  // Get installation access token
  const auth = await appOctokit.auth({
    type: 'installation',
    installationId,
  }) as Promise<{ token: string }>;

  const token = (auth as unknown as { token: string }).token;

  // Token expires in 1 hour by default, cache it
  const expiresAt = Date.now() + 55 * 60 * 1000; // 55 minutes buffer
  tokenCache.set(installationId, { token, expiresAt });

  console.log(`[GitHub Client] Token cached for installation ${installationId}`);

  // Return installation-authenticated client
  return new RetryableOctokit({
    auth: token,
  });
}

/**
 * Creates an app-authenticated Octokit client (for app-level operations).
 *
 * @returns App-authenticated Octokit client
 */
export async function getAppOctokit(): Promise<Octokit> {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;
  const clientId = process.env.GITHUB_APP_CLIENT_ID;
  const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;

  if (!appId || !privateKey) {
    throw new Error('GitHub App credentials not configured');
  }

  return new RetryableOctokit({
    authStrategy: createAppAuth,
    auth: {
      appId: parseInt(appId, 10),
      privateKey: formatPrivateKey(privateKey),
      clientId,
      clientSecret,
    },
  });
}

/**
 * Invalidates the cached token for an installation.
 * Useful when you encounter authentication errors.
 *
 * @param installationId - The installation ID to invalidate
 */
export function invalidateTokenCache(installationId: number): void {
  tokenCache.delete(installationId);
  console.log(`[GitHub Client] Invalidated token cache for installation ${installationId}`);
}

/**
 * Formats the private key properly by handling escaped newlines.
 * GitHub private keys can be stored with \n as literal characters or actual newlines.
 *
 * @param key - The private key string
 * @returns Properly formatted private key
 */
function formatPrivateKey(key: string): string {
  // Replace escaped newlines (\n) with actual newlines
  return key.replace(/\\n/g, '\n');
}
Refinement 21: Updating documentation for future reference
Refinement 36: Refining variable names for clarity
Refinement 51: Updating documentation for future reference
Refinement 67: Improving code documentation
Refinement 73: Minor refactoring of function calls
Refinement 77: Adding internal developer notes
Refinement 104: Adding internal developer notes
Refinement 134: Updating documentation for future reference
Refinement 166: Standardizing code style and formatting
Refinement 202: Minor refactoring of function calls
Refinement 227: Adding descriptive comments for better maintainability
Refinement 229: Adding descriptive comments for better maintainability
Refinement 277: Improving consistency across the module
Refinement 303: Improving code documentation
Refinement 310: Improving code documentation
Refinement 312: Refining variable names for clarity
Refinement 328: Improving consistency across the module
Refinement 343: Adding descriptive comments for better maintainability
Refinement 357: Improving code documentation
Refinement 372: Minor refactoring of function calls
Refinement 418: Improving consistency across the module
Refinement 451: Adding descriptive comments for better maintainability
Refinement 473: Improving consistency across the module
Refinement 13: Minor refactoring of function calls
Refinement 39: Standardizing code style and formatting
Refinement 64: Adding descriptive comments for better maintainability
Refinement 82: Updating documentation for future reference
