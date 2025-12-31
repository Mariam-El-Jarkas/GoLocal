
// const db = require('../config/db');
// const path = require('path');
// const fs = require('fs');

// const getCategories = (req, res) => {
//   db.query('SELECT * FROM categories', (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     res.json(result);
//   });
// };

// // GET SINGLE CATEGORY BY ID
// const getCategoryById = (req, res) => {
//   const { id } = req.params;
  
//   db.query('SELECT * FROM categories WHERE id = ?', [id], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
    
//     if (result.length === 0) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
    
//     res.json(result[0]);
//   });
// };

// // GET PLACES BY CATEGORY ID
// const getPlacesByCategoryId = (req, res) => {
//   const { id } = req.params;
  
//   db.query('SELECT * FROM places WHERE category_id = ?', [id], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     res.json(result);
//   });
// };

// // ADD NEW CATEGORY (with Material Icon)
// const addCategory = (req, res) => {
//   const { name, icon = 'place' } = req.body; // Default icon is 'place'
//   console.log('📝 Category name:', name);
//   console.log('🎯 Selected icon:', icon);
  
//   if (!name) return res.status(400).json({ message: 'Name is required' });

//   // Validate icon name (basic validation)
//   const iconRegex = /^[a-z_]+$/;
//   if (!iconRegex.test(icon)) {
//     return res.status(400).json({ message: 'Invalid icon name format' });
//   }

//   db.query(
//     'INSERT INTO categories (name, icon) VALUES (?, ?)',
//     [name, icon],
//     (err, result) => {
//       if (err) {
//         console.error('❌ Database error:', err);
//         return res.status(500).json({ message: 'Database error' });
//       }
//       console.log('✅ Category inserted with ID:', result.insertId);
//       res.json({ 
//         message: 'Category added successfully',
//         id: result.insertId,
//         icon: icon
//       });
//     }
//   );
// };

// // UPDATE CATEGORY (with Material Icon)
// const updateCategory = (req, res) => {
//   const { id } = req.params;
//   const { name, icon = 'place' } = req.body;

//   if (!name) return res.status(400).json({ message: 'Name is required' });

//   // Validate icon name
//   const iconRegex = /^[a-z_]+$/;
//   if (!iconRegex.test(icon)) {
//     return res.status(400).json({ message: 'Invalid icon name format' });
//   }

//   db.query(
//     'UPDATE categories SET name = ?, icon = ? WHERE id = ?',
//     [name, icon, id],
//     (err, result) => {
//       if (err) {
//         console.error('❌ Database error:', err);
//         return res.status(500).json({ message: 'Database error' });
//       }
//       if (result.affectedRows === 0)
//         return res.status(404).json({ message: 'Category not found' });
//       res.json({ 
//         message: 'Category updated successfully',
//         icon: icon
//       });
//     }
//   );
// };

// // DELETE CATEGORY
// const deleteCategory = (req, res) => {
//   const { id } = req.params;

//   // First check if category has places
//   db.query('SELECT COUNT(*) as placeCount FROM places WHERE category_id = ?', [id], (err, countResult) => {
//     if (err) {
//       console.error('❌ Database error:', err);
//       return res.status(500).json({ message: 'Database error' });
//     }
    
//     const placeCount = countResult[0].placeCount;
//     if (placeCount > 0) {
//       return res.status(400).json({ 
//         message: `Cannot delete category with ${placeCount} place(s). Delete the places first.` 
//       });
//     }
    
//     // Delete the category
//     db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
//       if (err) {
//         console.error('❌ Database error:', err);
//         return res.status(500).json({ message: 'Database error' });
//       }
      
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
      
//       res.json({ message: 'Category deleted successfully' });
//     });
//   });
// };

// module.exports = { 
//   getCategories, 
//   getCategoryById,
//   getPlacesByCategoryId,
//   addCategory, 
//   deleteCategory, 
//   updateCategory 
// };
const db = require('../config/db');

const getCategories = (req, res) => {
  db.query('SELECT * FROM categories ORDER BY name', (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(result);
  });
};

// GET SINGLE CATEGORY BY ID
const getCategoryById = (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(result[0]);
  });
};

// GET PLACES BY CATEGORY ID
const getPlacesByCategoryId = (req, res) => {
  const { id } = req.params;
  
  db.query('SELECT * FROM places WHERE category_id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(result);
  });
};

// ADD NEW CATEGORY (with Material Icon)
const addCategory = (req, res) => {
  const { name, icon = 'place' } = req.body;
  console.log('📝 ADD CATEGORY - Name:', name, 'Icon:', icon);
  
  if (!name) return res.status(400).json({ message: 'Name is required' });

  // Validate icon name
  const iconRegex = /^[a-z_]+$/;
  if (!iconRegex.test(icon)) {
    return res.status(400).json({ message: 'Invalid icon name format' });
  }

  db.query(
    'INSERT INTO categories (name, icon) VALUES (?, ?)',
    [name, icon],
    (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      console.log('✅ Category inserted with ID:', result.insertId);
      res.json({ 
        message: 'Category added successfully',
        id: result.insertId,
        name: name,
        icon: icon
      });
    }
  );
};

// UPDATE CATEGORY (with Material Icon)
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, icon = 'place' } = req.body;

  console.log('🔄 UPDATE CATEGORY - ID:', id, 'Name:', name, 'Icon:', icon);

  if (!name) return res.status(400).json({ message: 'Name is required' });

  // Validate icon name
  const iconRegex = /^[a-z_]+$/;
  if (!iconRegex.test(icon)) {
    return res.status(400).json({ message: 'Invalid icon name format' });
  }

  // First, get the current category to verify it exists
  db.query('SELECT * FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Now update the category
    db.query(
      'UPDATE categories SET name = ?, icon = ? WHERE id = ?',
      [name, icon, id],
      (err, updateResult) => {
        if (err) {
          console.error('❌ Database update error:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        
        console.log('✅ Update affected rows:', updateResult.affectedRows);
        
        // Return the updated category data
        res.json({ 
          message: 'Category updated successfully',
          id: id,
          name: name,
          icon: icon,
          affectedRows: updateResult.affectedRows
        });
      }
    );
  });
};

// DELETE CATEGORY
const deleteCategory = (req, res) => {
  const { id } = req.params;
  console.log('🗑️ DELETE CATEGORY - ID:', id);

  // First check if category has places
  db.query('SELECT COUNT(*) as placeCount FROM places WHERE category_id = ?', [id], (err, countResult) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    
    const placeCount = countResult[0].placeCount;
    if (placeCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete category with ${placeCount} place(s). Delete the places first.` 
      });
    }
    
    // Delete the category
    db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      console.log('✅ Category deleted successfully');
      res.json({ message: 'Category deleted successfully' });
    });
  });
};

module.exports = { 
  getCategories, 
  getCategoryById,
  getPlacesByCategoryId,
  addCategory, 
  deleteCategory, 
  updateCategory 
};