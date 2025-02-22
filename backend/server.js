const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123@#456',
  database: 'inventory_db'
});

db.connect(err => {
  if (err) {
    console.error('MySQL Connection Error:', err);
    return;
  }
  console.log(' MySQL Connected');
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Database Error:', err); 
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).json({ success: false, error: err });

    if (result.length > 0) {
      req.session.user = result[0];
      res.json({ success: true, user: req.session.user });
    } else {
      res.json({ success: false });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/insert', (req, res) => {
  const { name, quantity } = req.body;
  const sql = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  db.query(sql, [name, quantity], (err) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json({ success: true });
  });
});

app.get('/search', (req, res) => {
  const { query } = req.query;
  const sql = query ? 'SELECT * FROM products WHERE name LIKE ?' : 'SELECT * FROM products';
  db.query(sql, query ? [`%${query}%`] : [], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err });
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
