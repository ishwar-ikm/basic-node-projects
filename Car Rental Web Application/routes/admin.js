const express = require('express'); // Importing express library

const adminController = require('../controller/admin'); // Importing admin controller
const authorised = require('../middleware/authorised'); // Importing authorisation middleware

const router = express.Router(); // Creating a router instance

// Define routes for adding rentals
router.get('/add-rentals', authorised, adminController.getAddRentals); // GET request to render add rentals page
router.post('/add-rentals', authorised, adminController.postAddRentals); // POST request to handle adding rentals

// Route for rendering user profile page
router.get('/profile', authorised, adminController.getProfile); // GET request to render profile page

// Define routes for editing rentals
router.get('/edit-rentals', authorised, adminController.getEditRentals); // GET request to render edit rentals page
router.post('/edit-rentals', authorised, adminController.postEditRentals); // POST request to handle editing rentals

// Route for rendering edit page for a specific car
router.get('/edit/:carId', authorised, adminController.getEditPage); // GET request to render edit page for a specific car

// Route for deleting a car
router.post('/delete/:carId', authorised, adminController.delete); // POST request to handle car deletion

module.exports = router; // Exporting the router
