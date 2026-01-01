// build-production.js
const fs = require('fs');
const path = require('path');

// API URL to replace
const API_URL = 'https://golocal-2xn2.onrender.com';

// Files to update
const filesToUpdate = [
  'src/pages/AdminDashboard.js',
  'src/pages/AdminLogin.js',
  'src/pages/categories.js',
  'src/pages/CategoryPage.js',
  'src/pages/Contact.js',
  'src/pages/Home.js',
  'src/pages/PlaceDetails.js',
  'src/pages/SubcategoryPlacesPage.js',
  'src/components/PlaceCard.js'
];

console.log('🔧 Updating API URLs for production...');

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all variations
    content = content.replace(
      /const API_URL = process\.env\.REACT_APP_API_URL;/g,
      `const API_URL = "${API_URL}";`
    );
    
    content = content.replace(
      /process\.env\.REACT_APP_API_URL/g,
      `"${API_URL}"`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('🎉 All files updated! Now run: npm run build');
