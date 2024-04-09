const express = require('express'); // Importing express library
const rentalController = require('../controller/rentals'); // Importing rental controller
const authorised = require('../middleware/authorised'); // Importing authorisation middleware

const router = express.Router(); // Create an instance of Express Router

// Route for rendering the home page
router.get('/', rentalController.getIndex);

// Route for rendering details page of a specific car
router.get('/details/:carId', rentalController.getDetail);

// Route for rendering the order page and handling cancellation of orders
router.get('/order', authorised, rentalController.getOrder); // GET request to render order page
router.post('/cancel', authorised, rentalController.cancelOrder); // POST request to handle order cancellation

// Route for rendering the rent page and handling renting of cars
router.get('/rent/:carId', authorised, rentalController.getRentPage); // GET request to render rent page for a specific car
router.post('/rent', authorised, rentalController.postRent); // POST request to handle renting of cars

module.exports = router; // Exporting the router
