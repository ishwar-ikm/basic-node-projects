// Importing required modules for the Express application
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Creating an Express application
const app = express();

// Importing the defined routes for the application
const routes = require('./routes/route');

// Setting the view engine to EJS and specifying the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Using bodyParser middleware to parse url-encoded data in requests
app.use(bodyParser.urlencoded({ extended: false }));

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Using the defined routes for the application
app.use(routes);

// Handling requests that don't match any defined routes with a 404 page
app.use((req, res, next) => {
    res.render('404');
});

// Listening on port 3000 for incoming requests
app.listen(3000);
