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
router.post('/add', addCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', updateCategory);

module.exports = router;