// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg'); // PostgreSQL

// Import routes
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const placeRoutes = require('./routes/places');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// PostgreSQL Connection
// --------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render Postgres
  },
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

// Make pool accessible in routes (optional)
app.locals.db = pool;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Static uploads folder
// --------------------
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/uploads', express.static(uploadsPath));

// --------------------
// Routes
// --------------------
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('GoLocal backend is running');
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
