const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const getCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(result);
  });
};

const addCategory = (req, res) => {
  const { name } = req.body;
  console.log('📝 Category name:', name);
  console.log('📁 Uploaded file:', req.file);
  
  if (!name) return res.status(400).json({ message: 'Name is required' });

  let image = null;
  
  // Check if file was uploaded
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
    console.log('💾 Image path to save:', image);
  }

  db.query(
    'INSERT INTO categories (name, image) VALUES (?, ?)',
    [name, image],
    (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      console.log('✅ Category inserted with ID:', result.insertId);
      res.json({ 
        message: 'Category added successfully',
        id: result.insertId,
        image: image
      });
    }
  );
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, existingImage } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is required' });

  let image = existingImage || null;
  
  // If new file uploaded
  if (req.file) {
    image = `/uploads/${req.file.filename}`;
  }

  db.query(
    'UPDATE categories SET name = ?, image = ? WHERE id = ?',
    [name, image, id],
    (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Category not found' });
      res.json({ 
        message: 'Category updated successfully',
        image: image
      });
    }
  );
};

const deleteCategory = (req, res) => {
  const { id } = req.params;

  // First get the category to delete its image
  db.query('SELECT image FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length > 0 && result[0].image) {
      // Delete image file
      const imagePath = result[0].image.replace('/uploads/', '');
      const fullPath = path.join(__dirname, '..', 'uploads', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) console.error('Error deleting image file:', err);
        });
      }
    }
    
    // Now delete from database
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: 'Category deleted' });
    });
  });
};

module.exports = { getCategories, addCategory, deleteCategory, updateCategory };