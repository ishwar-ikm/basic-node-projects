// Required modules
const express = require('express'); // Express framework for Node.js
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const mongoose = require('mongoose'); // MongoDB object modeling tool
const path = require('path'); // Utilities for handling file paths
const session = require('express-session'); // Session middleware for Express
const MongoDBStore = require('connect-mongodb-session')(session); // MongoDB session store

// Importing route handlers
const rentalRoutes = require('./routes/rentals'); // Routes for rental operations
const adminRoutes = require('./routes/admin'); // Routes for admin operations
const loginRoutes = require('./routes/login'); // Routes for user login
const User = require('./models/user'); // User model
const { page } = require('pdfkit');

// MongoDB connection URI

/******************* Replace this string with your mongodb uri ******************/
const MONGODB_URI = "";  

// Initialize Express application
const app = express();

// Session store configuration
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware for serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing urlencoded request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware configuration
app.use(
    session({
        secret: 'my secret', // Secret for session signing
        resave: false, // Whether to save the session data if it's not modified
        saveUninitialized: false, // Whether to save uninitialized sessions
        store: store // MongoDB session store
    })
);

// Middleware to set 'isAuthenticated' flag in response locals based on session status
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});

// Middleware to fetch user details if available in session
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

// Route handlers
app.use('/admin', adminRoutes); // Admin routes
app.use(rentalRoutes); // Rental routes
app.use(loginRoutes); // Login routes

// Handle routes that is not found
app.use((req, res, next) => {
    res.render('get404', {
        pageTitle: "Page not found",
        active: ''
    });
})

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000); // Start server listening on port 3000
    })
    .catch(err => {
        console.log("Failed to connect to MongoDB server");
    });
