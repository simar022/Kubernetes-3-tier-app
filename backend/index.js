const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db-service',
  database: 'postgres', 
  password: process.env.DB_PASSWORD || 'mypassword',
  port: 5432,
  connectionTimeoutMillis: 5000,
});

// Database Endpoint
app.get('/api/products', async (req, res) => {
  try {
    const client = await pool.connect(); 
    const result = await client.query('SELECT * FROM products');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

/**
 * Normalized Stress Test for HPA
 * Use: /api/stress?intensity=50
 */
app.get('/api/stress', (req, res) => {
  const intensity = parseInt(req.query.intensity) || 10;
  const start = Date.now();
  
  let sum = 0;
  // Normalized loop: Adjustable intensity to simulate real load
  // 1e7 iterations is roughly 50-100ms of CPU time depending on environment
  for (let i = 0; i < (intensity * 1e6); i++) {
    sum += Math.sqrt(i) * Math.sqrt(i);
  }

  const duration = Date.now() - start;
  console.log(`Stress load: ${intensity} units | Processed in: ${duration}ms`);
  
  res.json({
    message: "CPU Load Generated",
    computeTimeMs: duration,
    podsActive: process.env.HOSTNAME // Helpful to see which pod responded
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
