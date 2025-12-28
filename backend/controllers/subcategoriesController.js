
const db = require('../config/db');

// Get subcategories by category ID
const getSubcategories = (req, res) => {
  const { categoryId } = req.params;

  db.query(
    'SELECT * FROM subcategories WHERE category_id = ?',
    [categoryId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(result);
    }
  );
};
const addSubcategory = (req, res) => {
  const { name, category_id } = req.body;
  if (!name || !category_id)
    return res.status(400).json({ message: 'Missing fields' });

  db.query(
    'INSERT INTO subcategories (name, category_id) VALUES (?, ?)',
    [name, category_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ 
        message: 'Subcategory added',
        id: result.insertId
      });
    }
  );
};

const deleteSubcategory = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM subcategories WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Subcategory deleted' });
  });
};

// Add this NEW function to get ALL subcategories
const getAllSubcategories = (req, res) => {
  db.query('SELECT * FROM subcategories', (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(result);
  });
};
// Add this function to subcategoriesController.js
const updateSubcategory = (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  if (!name || !category_id)
    return res.status(400).json({ message: 'Missing fields' });

  db.query(
    'UPDATE subcategories SET name = ?, category_id = ? WHERE id = ?',
    [name, category_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (result.affectedRows === 0)
        return res.status(404).json({ message: 'Subcategory not found' });
      res.json({ message: 'Subcategory updated successfully' });
    }
  );
};

// Add to module.exports:
module.exports = { 
  getSubcategories, 
  getAllSubcategories,
  addSubcategory, 
  deleteSubcategory,
  updateSubcategory 
};

