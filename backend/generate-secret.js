#!/usr/bin/env node

/**
 * Generate a secure JWT secret for production use
 * Run: node generate-secret.js
 */

const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

console.log('\n===========================================');
console.log('Generated JWT Secret for Production:');
console.log('===========================================\n');
console.log(secret);
console.log('\n===========================================');
console.log('Add this to your .env file:');
console.log('===========================================\n');
console.log(`JWT_SECRET=${secret}`);
console.log('\n');
