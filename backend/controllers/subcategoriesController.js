const db = require('../config/db');

// Get subcategories by category ID
const getSubcategories = (req, res) => {
  const { categoryId } = req.params;

  db.query(
    'SELECT * FROM subcategories WHERE category_id = $1',
    [categoryId],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(result.rows);
    }
  );
};

// NEW: Get subcategory details with category name
const getSubcategoryDetails = (req, res) => {
  const { id } = req.params;
  
  db.query(
    `SELECT s.*, c.name as category_name 
     FROM subcategories s 
     LEFT JOIN categories c ON s.category_id = c.id 
     WHERE s.id = $1`,
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
      
      res.json(result.rows[0]);
    }
  );
};

// Alternative simple function if join doesn't work
const getSubcategoryInfo = (req, res) => {
  const { id } = req.params;
  
  db.query(
    'SELECT * FROM subcategories WHERE id = $1',
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
      
      res.json(result.rows[0]);
    }
  );
};

const addSubcategory = (req, res) => {
  const { name, category_id } = req.body;
  if (!name || !category_id)
    return res.status(400).json({ message: 'Missing fields' });

  db.query(
    'INSERT INTO subcategories (name, category_id) VALUES ($1, $2) RETURNING id',
    [name, category_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ 
        message: 'Subcategory added',
        id: result.rows[0].id
      });
    }
  );
};

const deleteSubcategory = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM subcategories WHERE id = $1', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Subcategory deleted' });
  });
};

// Get ALL subcategories
const getAllSubcategories = (req, res) => {
  db.query('SELECT * FROM subcategories', (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(result.rows);
  });
};

// Update subcategory
const updateSubcategory = (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;

  if (!name || !category_id)
    return res.status(400).json({ message: 'Missing fields' });

  db.query(
    'UPDATE subcategories SET name = $1, category_id = $2 WHERE id = $3',
    [name, category_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (result.rowCount === 0)
        return res.status(404).json({ message: 'Subcategory not found' });
      res.json({ message: 'Subcategory updated successfully' });
    }
  );
};

// Export all functions
module.exports = { 
  getSubcategories, 
  getSubcategoryDetails,  // ADDED
  getSubcategoryInfo,     // ADDED (fallback)
  getAllSubcategories,
  addSubcategory, 
  deleteSubcategory,
  updateSubcategory 
};