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
# Refinement 42: Improving code documentation
# Refinement 46: Improving consistency across the module
# Refinement 98: Improving code documentation
# Refinement 101: Refining variable names for clarity
# Refinement 125: Optimizing logic in small sections
# Refinement 138: Refining variable names for clarity
# Refinement 212: Improving code documentation
# Refinement 218: Cleaning up whitespace and indentations
# Refinement 233: Adding internal developer notes
# Refinement 243: Adding descriptive comments for better maintainability
# Refinement 245: Refining variable names for clarity
# Refinement 256: Improving code documentation
# Refinement 292: Adding internal developer notes
