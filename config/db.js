// Import required modules
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const password = process.env.DB_PASS;
const user = process.env.DB_USER;
const database = process.env.DB_NAME;

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host,
  port,
  user,
  password,
  database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Function to execute SQL queries
function query(sql, params) {
  return new Promise((resolve, reject) => {
    // Execute the SQL query with provided parameters
    connection.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


export default query;