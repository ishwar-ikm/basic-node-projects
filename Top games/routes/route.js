// Import the Express framework
const express = require('express');

// Create a router object to define routes
const router = express.Router();

// Import the controller module, which contains route handlers
const controller = require('../controller/controller');

// Define routes and their corresponding controller functions

// GET request to the root path ('/') - renders the index page
router.get('/', controller.getIndex);

// GET request to '/page/:game' - renders a specific game page based on the parameter in the URL
router.get('/page/:game', controller.getPage);

// GET request to '/addGame' - renders the page for adding a new game
router.get('/addGame', controller.getAddGame);

// GET request to '/edit' - renders the page for editing games
router.get('/edit', controller.getEdit);

// GET request to '/edit-page/:game' - renders the page for editing a specific game based on the parameter in the URL
router.get('/edit-page/:game', controller.getEditPage);

// POST request to '/addGame' - handles the submission of the form for adding a new game
router.post('/addGame', controller.postAddGame);

// POST request to '/editGame' - handles the submission of the form for editing games
router.post('/editGame', controller.postEditGame);

// POST request to '/delete' - handles the deletion of a game
router.post('/delete', controller.delete);

// Export the router object to be used in other parts of the application
module.exports = router;
