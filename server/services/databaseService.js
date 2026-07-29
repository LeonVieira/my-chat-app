require("dotenv").config();
const { Client } = require("pg");

async function getMessages() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();

    const result = await client.query("SELECT * FROM messages");

    return result.rows;
  } finally {
    await client.end();
  }
}

module.exports = {
  getMessages,
};