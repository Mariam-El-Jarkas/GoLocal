const express = require('express');
const router = express.Router();
const {
  getPlaces,
  addPlace,
  deletePlace,
  updatePlace
} = require('../controllers/placesController');

const upload = require('../middleware/upload');

// Use the standard upload.single() - it should work!
router.get('/', getPlaces);
router.post('/add', upload.single('image'), addPlace);
router.delete('/delete/:id', deletePlace);
router.put('/update/:id', upload.single('image'), updatePlace);

module.exports = router;