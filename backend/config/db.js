// // config/db.js
// const mysql = require('mysql2');

// // DB connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',       // your XAMPP MySQL password
//   database: 'golocal_db'
// });

// // Connect
// db.connect((err) => {
//   if (err) console.log('DB connection error:', err);
//   else console.log('Connected to MySQL');
// });

// module.exports = db;
// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

module.exports = pool;
