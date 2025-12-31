const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getPlacesByCategoryId,
  addCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoriesController');

// Routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/places', getPlacesByCategoryId);
router.post('/add', addCategory); // No upload.single needed anymore
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategory); // No upload.single needed anymore

module.exports = router;