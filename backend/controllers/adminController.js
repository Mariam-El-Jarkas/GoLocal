const db = require('../config/db');

// SIMPLE ADMIN LOGIN - NO PASSWORD HASH
const login = (req, res) => {
  const { email, password } = req.body;
  
  console.log('🔐 Admin login:', email, password);
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  // Check if admin exists in database
  db.query(
    'SELECT * FROM admins WHERE email = $1 AND password = $2',
    [email, password], // Plain text password comparison
    (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (result.rows.length === 0) {
        console.log('❌ Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const admin = result.rows[0];
      console.log('✅ Admin login successful for:', admin.email);
      
      res.json({
        message: 'Login successful',
        admin: {
          id: admin.id,
          email: admin.email
        }
      });
    }
  );
};

// UPDATE PROFILE
const updateProfile = (req, res) => {
  const { email, currentPassword, newPassword, adminId } = req.body;
  
  console.log('📝 Update profile:', { adminId, email });
  
  if (!currentPassword) {
    return res.status(400).json({ message: 'Current password required' });
  }
  
  // First verify current password
  db.query(
    'SELECT * FROM admins WHERE id = $1 AND password = $2',
    [adminId, currentPassword],
    (err, result) => {
      if (err) {
        console.error('❌ Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Update email if provided
      if (email) {
        db.query(
          'UPDATE admins SET email = $1 WHERE id = $2',
          [email, adminId],
          (updateErr) => {
            if (updateErr) {
              console.error('❌ Update error:', updateErr);
              return res.status(500).json({ message: 'Update failed' });
            }
            
            // Update password if provided
            if (newPassword) {
              db.query(
                'UPDATE admins SET password = $1 WHERE id = $2',
                [newPassword, adminId],
                (passErr) => {
                  if (passErr) {
                    console.error('❌ Password update error:', passErr);
                    return res.status(500).json({ message: 'Password update failed' });
                  }
                  
                  res.json({ 
                    message: 'Profile updated successfully',
                    newEmail: email
                  });
                }
              );
            } else {
              res.json({ 
                message: 'Profile updated successfully',
                newEmail: email
              });
            }
          }
        );
      } else if (newPassword) {
        // Only update password
        db.query(
          'UPDATE admins SET password = $1 WHERE id = $2',
          [newPassword, adminId],
          (passErr) => {
            if (passErr) {
              console.error('❌ Password update error:', passErr);
              return res.status(500).json({ message: 'Password update failed' });
            }
            
            res.json({ message: 'Password updated successfully' });
          }
        );
      } else {
        res.status(400).json({ message: 'Nothing to update' });
      }
    }
  );
};

module.exports = { login, updateProfile };