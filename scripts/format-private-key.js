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
