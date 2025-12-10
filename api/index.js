// Simple Express API that connects to PostgreSQL
const express = require('express');
const { Pool } = require('pg');

const app = express();

// ---------------------------------------------------------------------------
// PostgreSQL connection settings
// These will come from docker-compose via environment variables
// ---------------------------------------------------------------------------
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'urbanestate',
  password: process.env.DB_PASS || 'password123',
  database: process.env.DB_NAME || 'urbanestate_db'
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    res.json({ status: 'ok', dbTime: result.rows[0].now });
  } catch (err) {
    console.error('DB error in /health:', err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Example endpoint – list of properties (for demo)
app.get('/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, title, city FROM properties');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error in /properties:', err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`UrbanEstate API listening on port ${port}`);
});
