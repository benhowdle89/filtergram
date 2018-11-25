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
  await client.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id serial PRIMARY KEY,
      username text NOT NULL,
      filters jsonb,
      created_at timestamp DEFAULT now(),
      "user_id" integer REFERENCES users(id)
    );
    `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS favourites (
      "id" serial,
      "instagram_url_id" text NOT NULL,
      "data" jsonb NOT NULL,
      "created_at" timestamp DEFAULT now(),
      "user_id" integer,
      PRIMARY KEY ("id"),
      FOREIGN KEY ("user_id") REFERENCES users(id)
  );
  
    `);
  await client.end();
  process.exit(0);
})();
