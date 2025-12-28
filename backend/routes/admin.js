const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const query = "SELECT * FROM admins WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      res.json({ 
        message: "Login successful",
        admin: results[0]
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
});

// NEW: Update admin profile
router.put("/update-profile", (req, res) => {
  const { email, currentPassword, newPassword, adminId } = req.body;
  
  if (!adminId) return res.status(400).json({ message: "Admin ID required" });
  
  // First verify current password
  const verifyQuery = "SELECT * FROM admins WHERE id = ? AND password = ?";
  db.query(verifyQuery, [adminId, currentPassword], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    
    if (results.length === 0) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
    // Update email and/or password
    let updateQuery = "UPDATE admins SET ";
    const updateValues = [];
    
    if (email) {
      updateQuery += "email = ?, ";
      updateValues.push(email);
    }
    
    if (newPassword) {
      updateQuery += "password = ?, ";
      updateValues.push(newPassword);
    }
    
    // Remove trailing comma and space
    updateQuery = updateQuery.slice(0, -2);
    updateQuery += " WHERE id = ?";
    updateValues.push(adminId);
    
    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }
      
      res.json({ 
        message: "Profile updated successfully",
        newEmail: email || results[0].email
      });
    });
  });
});

module.exports = router;
