const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt for:', email);
  
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // For now, accept ANY login to test
  console.log('✅ TEMPORARY: Accepting any login');
  res.json({ 
    message: "Login successful",
    admin: {
      id: 1,
      email: email
    }
  });
});

router.put("/update-profile", (req, res) => {
  console.log('📝 Update profile request received');
  res.json({ 
    message: "Profile updated successfully",
    newEmail: req.body.email || "phase2@gmail.com"
  });
});

module.exports = router;