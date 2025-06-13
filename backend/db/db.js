const { Client, Pool } = require("pg");

const DB_NAME = "faceappdb";

// Create the database if it doesn't exist
const createDatabase = async () => {
  const defaultClient = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres", // default DB
    password: "1234",
    port: 5432,
  });

  try {
    await defaultClient.connect();
    const res = await defaultClient.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`);
    if (res.rowCount === 0) {
      await defaultClient.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`✅ Database "${DB_NAME}" created.`);
    } else {
      console.log(`✅ Database "${DB_NAME}" already exists.`);
    }
  } catch (err) {
    console.error("❌ Error creating/checking database:", err);
  } finally {
    await defaultClient.end();
  }
};

// Create table inside the new DB
const createTable = async (pool) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS faceuserregister (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        descriptor FLOAT8[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "faceuserregister" created or already exists.');
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
};

// This is the function you're trying to use in server.js
const initDB = async () => {
  await createDatabase();

  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: DB_NAME,
    password: "1234",
    port: 5432,
  });

  await createTable(pool);
  return pool;
};

module.exports = { initDB };
