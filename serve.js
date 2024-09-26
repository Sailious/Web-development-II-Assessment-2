const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./crowdfunding_db'); // 假设你已经创建了这个模块来连接数据库
const cors = require('cors');

const app = express();
const PORT = 3000;

// 使用bodyParser中间件来解析JSON请求体
app.use(bodyParser.json());
app.use(cors());

// 获取所有正在进行的筹款活动
app.get('/fundraisers', (req, res) => {
  const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME ' +
                'FROM FUNDRAISER f ' +
                'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                'WHERE f.ACTIVE = TRUE';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// 获取所有类别
app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM CATEGORY', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// 获取筹款活动的详细信息
app.get('/fundraiser/:id', (req, res) => {
  const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME ' +
                'FROM FUNDRAISER f ' +
                'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                'WHERE f.FUNDRAISER_ID = ?';
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

app.get('/fundraiser/:id', (req, res) => {
  const query = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.NAME ' +
                'FROM FUNDRAISER f ' +
                'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                'WHERE f.FUNDRAISER_ID = ?';
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



// 处理搜索请求
app.get('/search', (req, res) => {
  let baseQuery = 'SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, c.NAME, f.ACTIVE ' +
                  'FROM FUNDRAISER f ' +
                  'JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID ' +
                  'WHERE f.ACTIVE = TRUE';

  let { organizer, city, category } = req.query;
  let params = [];

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

  connection.query(baseQuery, params, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});