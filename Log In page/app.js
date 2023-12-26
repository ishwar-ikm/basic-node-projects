const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Import routes
const loginRoutes = require('./routes/login');

// Create Express app
const app = express();

// Set up MongoDB session store
const store = new MongoDBStore({
    uri: 'your_mongodb_connection_string', // Replace with your MongoDB connection string
    collection: 'sessions'
});

// CSRF protection middleware
const csrfProtection = csrf();

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
    session({
        secret: 'your_session_secret', // Replace with a strong and unique session secret
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// CSRF and flash message middleware
app.use(csrfProtection);
app.use(flash());

// Middleware to provide CSRF token to all views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Use login routes
app.use(loginRoutes);

// Error handling middleware
app.use((req, res, next) => {
    res.render('error');
});

// Connect to MongoDB and start the server
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });
