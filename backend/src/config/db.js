import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Optional: test connection once (safe)
pool.connect()
  .then(client => {
    console.log("PostgreSQL Connected ✅");
    client.release();
  })
  .catch(err => {
    console.error("PostgreSQL Connection Error ❌", err.message);
  });