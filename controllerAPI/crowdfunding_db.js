// Import the 'mysql2' package to interact with MySQL databases
const mysql = require('mysql2');

// Create a configuration object for the MySQL connection
const connection = mysql.createConnection({
  // Set the host address for the MySQL server (localhost in this case)
  host: 'localhost',
  // Set the username for the MySQL server
  user: 'root',
  // Set the password for the MySQL server
  password: 'Yt6543210_',
  // Set the name of the database to connect to
  database: 'crowdfunding_db'
});

// Attempt to connect to the MySQL server using the provided configuration
connection.connect(err => {
  // If an error occurs during the connection process, print the error to the console and exit the function
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  // If the connection is successful, print a success message to the console
  console.log('Connected crowdfunding_db successfully');
});

// Export the 'connection' object so it can be used in other modules
module.exports = connection;