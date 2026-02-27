const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db-service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'postgres',
  port: 5432,
});

// 1. Unified Product Fetching (Category + Search)
app.get('/api/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
    }

    const result = await pool.query(query + ' ORDER BY id ASC', params);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch Products Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// 2. Save Order (Updated to match Frontend body)
app.post('/api/orders', async (req, res) => {
  try {
    const { items_count, total_amount } = req.body;
    
    // Basic Validation
    if (items_count === undefined || !total_amount) {
      return res.status(400).json({ error: "Missing order details" });
    }

    const result = await pool.query(
      'INSERT INTO orders (items_count, total_amount) VALUES ($1, $2) RETURNING *',
      [parseInt(items_count), parseFloat(total_amount)]
    );
    
    console.log(`Order Saved: ID ${result.rows[0].id}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Save Order Error:", err);
    res.status(500).json({ error: "Could not save order to database" });
  }
});

// 3. Get Order History (Latest first)
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch History Error:", err);
    res.status(500).json({ error: "Could not fetch history" });
  }
});

// 4. Kubernetes Liveness/Readiness Probe
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// 5. Stress Test for HPA
app.get('/api/stress', (req, res) => {
  const duration = parseInt(req.query.duration) || 500;
  const start = Date.now();
  // Artificial CPU Load
  while (Date.now() - start < duration) { Math.sqrt(Math.random()); }
  res.json({ status: "Busy", pod: process.env.HOSTNAME });
});

app.listen(5000, () => console.log('Q-Commerce Backend Live on 5000'));
