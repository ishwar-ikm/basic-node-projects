// Importing the 'express' module
const express = require('express');

// Creating a router instance using the Express Router
const router = express.Router();

// Importing the controller module for route handling
const routeController = require('../controller/control');

// Defining routes and associating them with corresponding controller functions

// GET request to the root path, renders the home page
router.get('/', routeController.home);

// GET request to the '/edit/:id' path, renders the edit page for a specific task
router.get('/edit/:id', routeController.getEdit);

// POST request to the '/submit-task' path, handles task submission
router.post('/submit-task', routeController.submitTask);

// POST request to the '/delete' path, handles task deletion
router.post('/delete', routeController.deleteTask);

// POST request to the '/edit' path, handles task editing
router.post('/edit', routeController.postEdit);

// Exporting the router for use in other parts of the application
module.exports = router;
