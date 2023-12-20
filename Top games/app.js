// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Import custom routes
const route = require('./routes/route');

// Create an Express application
const app = express();

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with urlencoded payloads
app.use(bodyParser.urlencoded({extended: false}));

// Use the custom routes defined in 'route.js'
app.use(route);

// Handle requests that do not match any route by rendering an error page
app.use((req, res) => {
    res.render('error', {
        pageTitle: 'Page not found'
    });
});

// Connect to MongoDB Atlas using Mongoose, utilizing environment variable for connection string
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        // Start the Express application on port 3000 after successfully connecting to the database
        app.listen(3000);
    });
