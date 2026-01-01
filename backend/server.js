require('dotenv').config(); // load .env

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

// ✅ CORS Configuration - Allow all your domains
const allowedOrigins = [
  'http://localhost:3000',                    // React dev server
  'https://golocal.infinityfree.me',          // InfinityFree frontend
  'https://golocal-2xn2.onrender.com',        // Your Render backend
  'http://localhost:5000'                     // Backend itself (for testing)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Allow localhost with any port for development
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if not exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Serve static files
app.use('/uploads', express.static(uploadsPath));

// Test routes
app.get('/', (req, res) => {
  res.json({
    message: 'GoLocal Backend API',
    status: 'online',
    timestamp: new Date().toISOString(),
    endpoints: {
      categories: '/api/categories',
      places: '/api/places',
      admin: '/api/admin/login',
      contacts: '/api/contacts'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'PostgreSQL on Render.com'
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is working correctly!',
    frontendConnectsTo: process.env.NODE_ENV === 'production' 
      ? 'https://golocal-2xn2.onrender.com' 
      : 'http://localhost:5000',
    cors: {
      allowedOrigins: allowedOrigins
    }
  });
});

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler - FIXED: Use a proper path
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'GET /api/test',
      'GET /api/categories',
      'GET /api/places',
      'POST /api/admin/login',
      'POST /api/contacts/add'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsPath}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🔗 Categories: http://localhost:${PORT}/api/categories`);
});