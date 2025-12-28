const express = require('express');
const router = express.Router();
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoriesController');

const upload = require('../middleware/upload');

router.get('/', getCategories);
router.post('/add', upload.single('image'), addCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/update/:id', upload.single('image'), updateCategory);

module.exports = router;