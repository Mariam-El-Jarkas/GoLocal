const express = require('express');
const router = express.Router();
const { addContact, getContacts, deleteContact } = require('../controllers/contactsController');

// Add a new contact
router.post('/add', addContact);

// Get all contacts
router.get('/', getContacts);

// Delete a contact by ID
router.delete('/delete/:id', deleteContact);

module.exports = router;
