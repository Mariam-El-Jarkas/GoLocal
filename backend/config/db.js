// config/db.js
const mysql = require('mysql2');

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // your XAMPP MySQL password
  database: 'golocal_db'
});

// Connect
db.connect((err) => {
  if (err) console.log('DB connection error:', err);
  else console.log('Connected to MySQL');
});

module.exports = db;
