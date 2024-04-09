module.exports = (req, res, next) => {
    // Check if the user is not logged in
    if (!req.session.isLoggedIn) {
        // If not logged in, redirect to the home page
        res.redirect('/');
    } else {
        // If logged in, proceed to the next middleware or route
        next();
    }
};