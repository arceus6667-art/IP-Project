import pg from 'pg';
const { Pool } = pg;
const globalForPool = globalThis;
export const pool = globalForPool.walletPool ?? new Pool({connectionString:process.env.DATABASE_URL, max:4, connectionTimeoutMillis:10000});
if (process.env.NODE_ENV !== 'production') globalForPool.walletPool = pool;
