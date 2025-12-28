
const express = require('express');
const router = express.Router();
const {
  getSubcategories,
  getAllSubcategories,  // Make sure this exists
  addSubcategory,
  deleteSubcategory,
  updateSubcategory  // <-- THIS MUST BE HERE!
} = require('../controllers/subcategoriesController');

// Get subcategories by category ID
router.get('/:categoryId', getSubcategories);

// Get ALL subcategories (NEW ROUTE)
router.get('/', getAllSubcategories);

router.post('/add', addSubcategory);
router.delete('/delete/:id', deleteSubcategory);
router.put('/update/:id', updateSubcategory); // <-- Needs the import above

module.exports = router;
