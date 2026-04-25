#!/usr/bin/env node

/**
 * Generate a random webhook secret for GitHub App.
 *
 * Usage:
 *   node scripts/generate-secret.js
 */

const crypto = require('crypto');

// Generate 32 random bytes (64 hex characters)
const secret = crypto.randomBytes(32).toString('hex');

console.log('\n=== GitHub Webhook Secret ===\n');
console.log(secret);
console.log('\nCopy this and paste it in:');
console.log('  1. GitHub App settings → Webhook Secret');
console.log('  2. Vercel → Environment Variables → WEBHOOK_SECRET');
console.log('');
