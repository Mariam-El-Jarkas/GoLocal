// routes/admin.js - FIXED VERSION
const express = require("express");
const router = express.Router();
const { login, updateProfile } = require("../controllers/adminController");

router.post("/login", login);
router.put("/update-profile", updateProfile);

module.exports = router;