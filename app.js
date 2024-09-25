// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./crowdfunding_db');

const app = express();
app.use(bodyParser.json());

// 一. 获取所有正在进行的筹款活动及其类别
app.get('/api/fundraisers', (req, res) => {
    const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = TRUE';
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  });
  
  // 二. 获取所有类别
  app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM CATEGORY';
    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  });
  
  // 三. 根据条件检索筹款活动及其类别
  app.get('/api/search', (req, res) => {
    let query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.ACTIVE = TRUE';
    const { city, organizer, category } = req.query;
  
    if (city) {
      query += " AND f.CITY = ?";
    }
    if (organizer) {
      query += " AND f.ORGANIZER = ?";
    }
    if (category) {
      query += " AND c.NAME = ?";
    }
  
    const params = [];
    if (city) params.push(city);
    if (organizer) params.push(organizer);
    if (category) params.push(category);
  
    connection.query(query, params, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json(results);
    });
  });
  
  // 四. 根据 ID 获取筹款活动详细信息
  app.get('/api/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id;
    const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME AS CATEGORY_NAME FROM FUNDRAISER f INNER JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.FUNDRAISER_ID = ? AND f.ACTIVE = TRUE';
    connection.query(query, [fundraiserId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Fundraiser not found' });
      }
      res.status(200).json(results[0]);
    });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });