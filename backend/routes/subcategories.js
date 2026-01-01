const express = require('express');
const router = express.Router();
const {
  getSubcategories,
  getSubcategoryDetails, 
  getSubcategoryInfo,    
  getAllSubcategories,
  addSubcategory,
  deleteSubcategory,
  updateSubcategory
} = require('../controllers/subcategoriesController');

// Routes
router.get('/:categoryId', getSubcategories);
router.get('/:id/details', getSubcategoryDetails);  
router.get('/:id/info', getSubcategoryInfo);        
router.get('/', getAllSubcategories);
router.post('/add', addSubcategory);
router.delete('/delete/:id', deleteSubcategory);
router.put('/update/:id', updateSubcategory);

module.exports = router;