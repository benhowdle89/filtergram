const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString
});

const shutdown = async () => {
  await pool.end();
  process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

module.exports = async (query, values) => {
  const { rows } = await pool.query(query, values);
  return rows;
};
