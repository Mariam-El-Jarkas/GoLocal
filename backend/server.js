require('dotenv').config(); // load .env

const express = require('express');
const cors = require('cors'); // require CORS here
const path = require('path');
const fs = require('fs');

const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const placeRoutes = require('./routes/places');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');

const app = express(); // initialize app FIRST

// ✅ Use CORS, allow your frontend
app.use(cors({
  origin: ["https://golocal.infinityfree.me"]
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if not exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

// Serve static files
app.use('/uploads', express.static(uploadsPath));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

// Test route
app.get('/', (req, res) => res.send('GoLocal backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
