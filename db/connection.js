// PG database client/connection setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};

const db = new Pool(dbParams);

db.connect()
  .then(() => {
    console.log(`Connected to database: ${dbParams.database}, on host: ${dbParams.host}, on port: ${dbParams.port}\n-----------------------------------------------------`);
  }).catch((error) => {
    console.log(`Connection Error: ${error}`);
  });

module.exports = db;
