// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./crowdfunding_db'); // Import the database connection module
const cors = require('cors');

// Initialize the Express application
const app = express();
const PORT = 3000; // Define the port the server will listen on

// Use the bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());
// Enable CORS to allow cross-origin requests
app.use(cors());

// Route to get all ongoing fundraisers
app.get('/fundraisers', (req, res) => {
  // Define the SQL query to fetch all active fundraisers and their category information
  const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME ' +
                'FROM FUNDRAISER f ' +
                'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                'WHERE f.ACTIVE = TRUE';
  // Execute the query, handling any errors or results
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Route to get all categories
app.get('/categories', (req, res) => {
  // Define the SQL query to fetch all available categories
  connection.query('SELECT * FROM CATEGORY', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Route to get detailed information for a specific fundraiser
app.get('/fundraiser/:id', (req, res) => {
  // Define the SQL query to fetch detailed information for a fundraiser by ID
  const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME ' +
                'FROM FUNDRAISER f ' +
                'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                'WHERE f.FUNDRAISER_ID = ?';
  // Use parameterized query to prevent SQL injection
  connection.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(404).send('Fundraiser not found');
    } else {
      res.json(results[0]);
    }
  });
});

// Route to handle search queries
app.get('/search', (req, res) => {
  let baseQuery = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME, f.ACTIVE ' +
                  'FROM FUNDRAISER f ' +
                  'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                  'WHERE f.ACTIVE = TRUE';

  let { organizer, city, category } = req.query;
  let params = [];

  // Build a dynamic SQL query based on provided search parameters
  if (organizer) {
    baseQuery += ' AND f.ORGANIZER LIKE ?';
    params.push(`%${organizer}%`);
  }
  if (city) {
    baseQuery += ' AND f.CITY = ?';
    params.push(city);
  }
  if (category) {
    baseQuery += ' AND c.NAME = ?';
    params.push(category);
  }

  // Execute the query, handling any errors or results
  connection.query(baseQuery, params, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});