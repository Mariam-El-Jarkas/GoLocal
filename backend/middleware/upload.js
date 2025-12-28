const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    
    const cleanName = (name) => {
      if (!name) return '';
      return name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
        .toLowerCase();
    };
    
    let filename;
    
    // For categories - use name from req.body (works because it's parsed)
    if (req.baseUrl.includes('/categories')) {
      const categoryName = req.body.name || 'category';
      filename = `${cleanName(categoryName)}${ext}`;
    } 
    // For places - we need a different approach since req.body isn't available yet
    else if (req.baseUrl.includes('/places')) {
      // TEMPORARY: Use original filename or timestamp
      // We'll fix this after the file is saved
      const timestamp = Date.now();
      filename = `temp-place-${timestamp}${ext}`;
    } 
    else {
      filename = `file-${Date.now()}${ext}`;
    }
    
    // Avoid duplicates
    let finalFilename = filename;
    let counter = 1;
    let filePath = path.join(uploadDir, finalFilename);
    
    while (fs.existsSync(filePath)) {
      const nameWithoutExt = finalFilename.replace(ext, '');
      finalFilename = `${nameWithoutExt}-${counter}${ext}`;
      filePath = path.join(uploadDir, finalFilename);
      counter++;
    }
    
    cb(null, finalFilename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;