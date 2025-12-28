const db = require('../config/db');

// Add a new contact message
const addContact = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields required' });
  }

  db.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ message: 'Message sent' });
    }
  );
};

// Get all contact messages
const getContacts = (req, res) => {
  db.query('SELECT * FROM contacts', (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(result);
  });
};

// Delete a contact message by ID
const deleteContact = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM contacts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Message deleted' });
  });
};

module.exports = { addContact, getContacts, deleteContact };
