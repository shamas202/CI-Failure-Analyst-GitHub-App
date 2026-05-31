#!/usr/bin/env node

/**
 * Helper script to format your GitHub App private key for .env files.
 *
 * Usage:
 *   node scripts/format-private-key.js /path/to/your-key.pem
 *
 * Or paste your key when prompted.
 */

const fs = require('fs');
const readline = require('readline');

function formatPrivateKey(key) {
  // Remove any existing escaping
  let formatted = key.trim();

  // Replace actual newlines with \n
  formatted = formatted.replace(/\n/g, '\\n');

  return formatted;
}

async function main() {
  const args = process.argv.slice(2);

  let privateKey = '';

  if (args[0]) {
    // Read from file
    try {
      privateKey = fs.readFileSync(args[0], 'utf-8');
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      process.exit(1);
    }
  } else {
    // Prompt for input
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('Paste your GitHub App private key (the .pem file content):');
    console.log('Start with -----BEGIN RSA PRIVATE KEY-----');
    console.log('End with -----END RSA PRIVATE KEY-----');
    console.log('---');

    const lines = [];

    for await (const line of rl) {
      if (line.includes('-----END RSA PRIVATE KEY-----')) {
        lines.push(line);
        break;
      }
      lines.push(line);
    }

    privateKey = lines.join('\n');
    rl.close();
  }

  const formatted = formatPrivateKey(privateKey);

  console.log('\n---\n');
  console.log('Copy this value for GITHUB_APP_PRIVATE_KEY:');
  console.log('---');
  console.log(formatted);
  console.log('---');
  console.log('\nAdd it to your .env.local or Vercel environment variables.');
}

main().catch(console.error);
# Refinement 12: Improving consistency across the module
# Refinement 14: Minor refactoring of function calls
# Refinement 18: Minor refactoring of function calls
# Refinement 189: Optimizing logic in small sections
# Refinement 205: Improving code documentation
# Refinement 206: Minor refactoring of function calls
# Refinement 214: Adding descriptive comments for better maintainability
# Refinement 231: Updating documentation for future reference
# Refinement 239: Updating documentation for future reference
# Refinement 260: Refining variable names for clarity
# Refinement 272: Refining variable names for clarity
# Refinement 317: Adding descriptive comments for better maintainability
# Refinement 347: Refining variable names for clarity
# Refinement 390: Improving code documentation
# Refinement 406: Improving code documentation
# Refinement 444: Optimizing logic in small sections
# Refinement 448: Optimizing logic in small sections
# Refinement 455: Refining variable names for clarity
# Refinement 471: Refining variable names for clarity
# Refinement 21: Optimizing logic in small sections
# Refinement 30: Improving code documentation
# Refinement 60: Updating documentation for future reference
# Refinement 89: Improving consistency across the module
# Refinement 131: Standardizing code style and formatting
# Refinement 159: Adding descriptive comments for better maintainability
# Refinement 184: Standardizing code style and formatting
# Refinement 186: Adding internal developer notes
# Refinement 217: Improving code documentation
# Refinement 226: Standardizing code style and formatting
# Refinement 257: Updating documentation for future reference
# Refinement 344: Improving code documentation
