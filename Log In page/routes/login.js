const express = require('express');
const loginController = require('../controllers/login');
const { check } = require('express-validator');
const authorised = require('../middleware/authotised');

// Create an instance of Express Router
const router = express.Router();

// Route: GET /
router.get('/', loginController.getLogin);

// Route: GET /loggedin
// Middleware: Check if the user is authorized (logged in) before accessing the route
router.get('/loggedin', authorised.isauthorised, loginController.getLoggedin);

// Route: POST /logout
// Middleware: Check if the user is authorized (logged in) before logging out
router.post('/logout', authorised.isauthorised, loginController.logout);

// Route: POST /login
// Validation: Check email format and password length
router.post('/login', [
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password', 'Password should be a minimum of 5 characters').isLength({ min: 5 })
], loginController.postLogin);

// Route: GET /register
router.get('/register', loginController.getRegister);

// Route: POST /register
// Validation: Check email format, password length, and password match
router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email'),
    check('password', 'Password should be a minimum of 5 characters').isLength({ min: 5 }),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password doesn't match");
        }
        return true;
    })
], loginController.postRegister);

// Route: GET /forgotPassword
router.get('/forgotPassword', loginController.getForgotPassword);

// Route: POST /forgotPassword
router.post('/forgotPassword', loginController.postForgotPassword);

// Route: GET /reset/:token
router.get('/reset/:token', loginController.getResetPassword);

// Route: POST /reset
// Validation: Check password length and password match
router.post('/reset', [
    check('password', 'Password should be a minimum of 5 characters').isLength({ min: 5 }),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password doesn't match");
        }
        return true;
    })
], loginController.postResetPassword);

// Export the router for use in other parts of the application
module.exports = router;
