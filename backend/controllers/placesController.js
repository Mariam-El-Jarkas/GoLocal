const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const getPlaces = (req, res) => {
  db.query('SELECT * FROM places', (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(result);
  });
};

// GET PLACE BY ID
const getPlaceById = (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM places WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Place not found' });
    }
    
    res.json(result[0]);
  });
};

// GET SUB CATEGORY DETAILS
const getSubcategoryDetails = (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM subcategories WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    res.json(result[0]);
  });
};

const addPlace = (req, res) => {
  console.log('🔄 addPlace called');
  console.log('File:', req.file);
  console.log('Body:', req.body);

  const { name, description, address, category_id, subcategory_id, category_name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  let image = null;
  
  if (req.file) {
    // RENAME THE FILE to categoryname.placename format
    const ext = path.extname(req.file.filename);
    
    const cleanName = (name) => {
      if (!name) return '';
      return name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
    };
    
    // Use category_name from the form OR fetch it from database
    let categoryName = category_name || 'category';
    
    // If no category_name provided, try to get it from database
    if ((!category_name || category_name === 'category') && category_id) {
      // Try to get category name from database
      db.query('SELECT name FROM categories WHERE id = ?', [category_id], (err, categoryResult) => {
        if (err) {
          console.error('Error fetching category:', err);
          proceedWithRenaming();
        } else if (categoryResult.length > 0) {
          categoryName = categoryResult[0].name;
          proceedWithRenaming();
        } else {
          proceedWithRenaming();
        }
      });
    } else {
      proceedWithRenaming();
    }
    
    function proceedWithRenaming() {
      const cleanPlaceName = cleanName(name);
      const cleanCategoryName = cleanName(categoryName);
      
      const newFilename = `${cleanCategoryName}.${cleanPlaceName}${ext}`;
      const oldPath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const newPath = path.join(__dirname, '..', 'uploads', newFilename);
      
      // Rename the file
      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          console.error('Error renaming file:', renameErr);
          // Use the original filename if rename fails
          image = `/uploads/${req.file.filename}`;
          saveToDatabase();
        } else {
          console.log(`✅ File renamed to: ${newFilename}`);
          image = `/uploads/${newFilename}`;
          saveToDatabase();
        }
      });
    }
  } else {
    saveToDatabase();
  }

  function saveToDatabase() {
    const cleanDescription = description || null;
    const cleanAddress = address || null;
    const cleanCategoryId = category_id || null;
    const cleanSubcategoryId = subcategory_id || null;

    db.query(
      'INSERT INTO places (name, description, address, image, category_id, subcategory_id) VALUES (?, ?, ?, ?, ?, ?)',
      [name, cleanDescription, cleanAddress, image, cleanCategoryId, cleanSubcategoryId],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ 
              message: 'Category or subcategory does not exist' 
            });
          }
          return res.status(500).json({ 
            message: 'Database error: ' + err.message 
          });
        }
        res.json({ 
          message: 'Place added successfully',
          id: result.insertId,
          image: image
        });
      }
    );
  }
};

const updatePlace = (req, res) => {
  const { id } = req.params;
  const { name, description, address, existingImage, category_id, subcategory_id, category_name } = req.body;

  if (!name) return res.status(400).json({ message: 'Name is required' });

  let image = existingImage || null;
  
  if (req.file) {
    // RENAME THE FILE
    const ext = path.extname(req.file.filename);
    
    const cleanName = (name) => {
      if (!name) return '';
      return name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
    };
    
    let categoryName = category_name || 'category';
    
    if ((!category_name || category_name === 'category') && category_id) {
      db.query('SELECT name FROM categories WHERE id = ?', [category_id], (err, categoryResult) => {
        if (err) {
          console.error('Error fetching category:', err);
          proceedWithUpdateRenaming();
        } else if (categoryResult.length > 0) {
          categoryName = categoryResult[0].name;
          proceedWithUpdateRenaming();
        } else {
          proceedWithUpdateRenaming();
        }
      });
    } else {
      proceedWithUpdateRenaming();
    }
    
    function proceedWithUpdateRenaming() {
      const cleanPlaceName = cleanName(name);
      const cleanCategoryName = cleanName(categoryName);
      
      const newFilename = `${cleanCategoryName}.${cleanPlaceName}${ext}`;
      const oldPath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const newPath = path.join(__dirname, '..', 'uploads', newFilename);
      
      // Delete old image if it exists
      if (existingImage && existingImage.startsWith('/uploads/')) {
        const oldImageName = existingImage.replace('/uploads/', '');
        const oldImagePath = path.join(__dirname, '..', 'uploads', oldImageName);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error('Error deleting old image:', err);
          });
        }
      }
      
      // Rename the new file
      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          console.error('Error renaming file:', renameErr);
          image = `/uploads/${req.file.filename}`;
          updateDatabase();
        } else {
          console.log(`✅ File renamed to: ${newFilename}`);
          image = `/uploads/${newFilename}`;
          updateDatabase();
        }
      });
    }
  } else {
    updateDatabase();
  }

  function updateDatabase() {
    const cleanDescription = description || null;
    const cleanAddress = address || null;
    const cleanCategoryId = category_id || null;
    const cleanSubcategoryId = subcategory_id || null;

    db.query(
      'UPDATE places SET name = ?, description = ?, address = ?, image = ?, category_id = ?, subcategory_id = ? WHERE id = ?',
      [name, cleanDescription, cleanAddress, image, cleanCategoryId, cleanSubcategoryId, id],
      (err, result) => {
        if (err) {
          console.error("Update error:", err);
          return res.status(500).json({ message: 'Database error' });
        }
        if (result.affectedRows === 0)
          return res.status(404).json({ message: 'Place not found' });
        res.json({ 
          message: 'Place updated successfully',
          image: image
        });
      }
    );
  }
};

const deletePlace = (req, res) => {
  const { id } = req.params;

  db.query('SELECT image FROM places WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    
    if (result.length > 0 && result[0].image) {
      const imagePath = result[0].image.replace('/uploads/', '');
      const fullPath = path.join(__dirname, '..', 'uploads', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) console.error('Error deleting image file:', err);
        });
      }
    }
    
    db.query('DELETE FROM places WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ message: 'Place deleted' });
    });
  });
};

module.exports = { 
  getPlaces, 
  getPlaceById,
  getSubcategoryDetails,
  addPlace, 
  deletePlace, 
  updatePlace 
};