const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Neon closes connections when its compute scales to zero after inactivity.
// Without this listener, an idle client dropping would crash the process; the
// pool just opens a fresh connection (waking Neon) on the next query.
pool.on('error', (err) => {
  console.error('Idle database connection closed:', err.message);
});

module.exports = pool;
