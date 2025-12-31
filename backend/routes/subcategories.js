const express = require('express');
const router = express.Router();
const {
  getSubcategories,
  getSubcategoryDetails,  // ADD THIS IMPORT
  getSubcategoryInfo,     // ADD THIS IMPORT
  getAllSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory
} = require('../controllers/subcategoriesController');

// Routes
router.get('/:categoryId', getSubcategories);
router.get('/:id/details', getSubcategoryDetails);     // ADD THIS ROUTE
router.get('/:id/info', getSubcategoryInfo);           // ADD THIS ROUTE (fallback)
router.get('/', getAllSubcategories);
router.post('/add', addSubcategory);
router.delete('/delete/:id', deleteSubcategory);
router.put('/update/:id', updateSubcategory);

module.exports = router;