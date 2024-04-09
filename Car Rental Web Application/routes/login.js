const express = require('express'); // Importing express library
const loginController = require('../controller/login'); // Importing login controller

const router = express.Router(); // Create an instance of Express Router

// Route for rendering login page
router.get('/login', loginController.getLogin);

// Route for logging out
router.post('/logout', loginController.logout);

// Route for handling login submission
router.post('/login', loginController.postLogin);

// Route for rendering registration page
router.get('/signup', loginController.getRegister);

// Route for handling registration submission
router.post('/signup', loginController.postRegister);

module.exports = router; // Exporting the router
