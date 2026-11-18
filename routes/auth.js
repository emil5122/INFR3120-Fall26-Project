const express = require ('express');
const router = express.Router();


// GET Routes

// Returns the login page.
router.get('/login', (req, res) => {
    res.render('login');
});

// POST Routes
// Used to create a new user, user must send desired username + password, then check db if username is taken.
router.post('/register/newUser', (req, res) => {
    res.json('creating new user');
});

// Used to delete a user, user must send username + password along with this request.
router.delete('/register/deleteUser', (req, res) => {
    res.json('deleting user');
});

// Handles logging in functionality, user sends username + password, check db after hashing.
router.post('/login', (req, res) => {
    res.json('logging in');
});

module.exports = router;