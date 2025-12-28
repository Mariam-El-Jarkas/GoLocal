const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');
const placeRoutes = require('./routes/places');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = 5000;

// 1. Create uploads folder
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('✅ Created uploads folder');
}

// 2. Middleware - IMPORTANT: No body-parser for file uploads!
app.use(cors());
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// 3. Serve static files
app.use('/uploads', express.static(uploadsPath));

// Test route
app.get('/', (req, res) => {
  res.send('GoLocal backend is running');
});

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});