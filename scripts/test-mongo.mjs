/**
 * Test MongoDB Atlas connection — run before deploying to Vercel.
 * Usage: npm run test:mongo
 */
import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { createRequire } from 'module';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const require = createRequire(import.meta.url);
const { normalizeMongoUri } = require('../src/server/config/mongo-uri.js');

const uri = normalizeMongoUri(process.env.MONGODB_URI || '');

console.log('Connecting to', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  console.log('✓ Connected to database:', mongoose.connection.name);
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('✓ Collections:', collections.map((c) => c.name).join(', ') || '(empty — run npm run seed)');
  await mongoose.disconnect();
  console.log('\nIf this works locally but Vercel fails → Atlas Network Access needs 0.0.0.0/0');
} catch (err) {
  console.error('✗ Failed:', err.message);
  if (/whitelist/i.test(err.message)) {
    console.error('\n→ Atlas → Network Access → Add 0.0.0.0/0 (Allow from anywhere)');
  }
  process.exit(1);
}
