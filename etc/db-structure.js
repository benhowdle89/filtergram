require("dotenv").config();
const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL;
(async () => {
  const client = new Client(connectionString);
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
    );`);
  await client.end();
  process.exit(0);
})();
