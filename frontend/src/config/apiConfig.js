const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Helper function for images
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  // If image path is absolute URL, use it directly
  if (imagePath.startsWith('http')) return imagePath;
  // Otherwise prepend API URL
  return `${API_URL}${imagePath}`;
};

export { API_URL, getImageUrl };
