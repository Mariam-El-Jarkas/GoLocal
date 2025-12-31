const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

const {
  getPlaces,
  getPlaceById,
  getSubcategoryDetails,
  addPlace,
  deletePlace,
  updatePlace
} = require('../controllers/placesController');

// Routes
router.get('/', getPlaces);
router.get('/:id', getPlaceById);
router.get('/:id/details', getSubcategoryDetails); // This line should work now
router.post('/add', upload.single('image'), addPlace);
router.delete('/delete/:id', deletePlace);
router.put('/update/:id', upload.single('image'), updatePlace);

module.exports = router;