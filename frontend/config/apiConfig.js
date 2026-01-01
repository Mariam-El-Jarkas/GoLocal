// API Configuration for GoLocal Frontend

// Get URLs from environment variables
const BACKENDS = {
  local: process.env.REACT_APP_API_URL_LOCAL || 'http://localhost:5000',
  render: process.env.REACT_APP_API_URL || 'https://golocal-2xn2.onrender.com',
  infinityfree: process.env.REACT_APP_API_URL_PRODUCTION || 'https://golocal.infinityfree.me'
};

// ⚡ IMPORTANT: Change this based on where you're running
// 'local' = Development on your computer
// 'render' = Production (frontend on InfinityFree, backend on Render)
// 'infinityfree' = If you move backend to InfinityFree
const ACTIVE_BACKEND = 'local'; // ← CHANGE THIS LINE FOR DEPLOYMENT

export const API_URL = BACKENDS[ACTIVE_BACKEND];

export const getImageUrl = (imagePath) => {
  if (!imagePath || imagePath === 'null' || imagePath === 'undefined') {
    console.warn('⚠️ No image path provided');
    return '';
  }
  
  // Already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Starts with /uploads
  if (imagePath.startsWith('/uploads/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // Just filename
  return `${API_URL}/uploads/${imagePath}`;
};

// Debug information
console.group('🌐 GoLocal API Configuration');
console.log('Active Backend:', ACTIVE_BACKEND);
console.log('API URL:', API_URL);
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('All Available Backends:', BACKENDS);
console.groupEnd();

// For debugging in browser console
if (typeof window !== 'undefined') {
  window.apiConfig = {
    API_URL,
    ACTIVE_BACKEND,
    BACKENDS,
    switchBackend: (backendName) => {
      if (BACKENDS[backendName]) {
        const message = `Switch backend to ${backendName} (${BACKENDS[backendName]})?`;
        if (window.confirm(message)) {
          localStorage.setItem('forceBackend', backendName);
          window.location.reload();
        }
      } else {
        console.error('Invalid backend:', backendName);
      }
    }
  };
  
  // Check for forced backend in localStorage
  const forcedBackend = localStorage.getItem('forceBackend');
  if (forcedBackend && BACKENDS[forcedBackend] && forcedBackend !== ACTIVE_BACKEND) {
    console.log(`🔄 Overriding backend to: ${forcedBackend}`);
    // Note: This requires page reload to take effect
  }
}