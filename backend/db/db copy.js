const { Client, Pool } = require("pg");

const defaultClient = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres", // Connect to the default "postgres" database
  password: "1234",
  port: 5432,
});

// Function to create the database
const createDatabase = async () => {
  try {
    await defaultClient.connect();
    const res = await defaultClient.query(
      "SELECT 1 FROM pg_database WHERE datname = 'faceappdb'"
    );
    if (res.rowCount === 0) {
      await defaultClient.query("CREATE DATABASE faceappdb");
      console.log('Database "faceappdb" created');
    } else {
      console.log('Database "faceappdb" already exists');
    }
  } catch (err) {
    console.error("Error creating/checking database:", err);
  } finally {
    await defaultClient.end();
  }
};

// Function to create the "users" table
const createTable = async () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "faceappdb",
    password: "1234",
    port: 5432,
  });

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

    console.log('Table "faceuserregister" created or already exists');
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    await pool.end();
  }
};

// Initialize database and table
const setupDatabase = async () => {
  await createDatabase();
  await createTable();
};

// setupDatabase();    // run for create database and tables  // database create first

module.exports = { initDB: setupDatabase };

