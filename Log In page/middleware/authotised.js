// Middleware to check if the user is logged in before allowing access to a route
exports.isauthorised = (req, res, next) => {
    // Check if the user is not logged in
    if (!req.session.isLoggedin) {
        // If not logged in, redirect to the home page
        res.redirect('/');
    } else {
        // If logged in, proceed to the next middleware or route
        next();
    }
};
