const bcrypt = require('bcrypt');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

// Create a nodemailer transporter with Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // Replace with your Gmail email
        pass: 'your_email_password' // Replace with your Gmail app password
    }
});

// Handle user login
exports.getLogin = (req, res, next) => {
    // Flash messages for error handling
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('page/login', {
        pageTitle: 'Log In',
        errorMessage: message,
        oldInput: { email: '', password: '' }
    });
};

// Render logged-in page
exports.getLoggedin = (req, res, next) => {
    res.render('page/loggedIn', {
        pageTitle: 'loggedIn'
    });
};

// Logout the user and destroy the session
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

// Handle user login post request
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('page/login', {
            pageTitle: 'Log In',
            errorMessage: errors.array()[0].msg,
            oldInput: { email: email, password: password }
        });
    }

    // Check if the user exists in the database
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                // If user does not exist, render login page with error message
                return res.status(422).render('page/login', {
                    pageTitle: 'Log In',
                    errorMessage: 'Invalid Email or Password',
                    oldInput: { email: email, password: password }
                });
            }

            // Compare the entered password with the hashed password in the database
            bcrypt.compare(password, user.password)
                .then(isMatched => {
                    if (isMatched) {
                        // If passwords match, set session variables and redirect to logged-in page
                        req.session.isLoggedin = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/loggedin');
                        });
                    }

                    // If passwords do not match, render login page with error message
                    return res.status(422).render('page/login', {
                        pageTitle: 'Log In',
                        errorMessage: 'Invalid Email or Password',
                        oldInput: { email: email, password: password }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/');
                });
        })
        .catch(err => {
            console.log(err);
        });
};

// Handle user registration
exports.getRegister = (req, res, next) => {
    // Flash messages for error handling
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('page/register', {
        pageTitle: 'Register',
        errorMessage: message,
        oldInput: { email: '', password: '', confirmPassword: '' }
    });
};

// Handle user registration post request
exports.postRegister = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If validation errors exist, render registration page with error message
        return res.status(422).render('page/register', {
            pageTitle: 'Register',
            errorMessage: errors.array()[0].msg,
            oldInput: { email: email, password: password, confirmPassword: req.body.confirmPassword }
        });
    }

    // Check if the user with the provided email already exists
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user exists, flash an error message and redirect to registration page
                req.flash('error', 'Email already exists');
                return res.redirect('/register');
            }

            // Hash the password before saving it to the database
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    // Create a new user with the hashed password and save to the database
                    const user = new User({
                        email: email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(resutl => {
                    // Redirect to the home page after successful registration
                    res.redirect('/');
                    
                    // Send welcome email to the registered user
                    let mailOptions = {
                        from: 'your_email@gmail.com', // Replace with your Gmail email
                        to: email,
                        subject: 'Welcome',
                        text: 'You successfully signed up'
                    };

                    return transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(info.response);
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};

// Render forgot password page
exports.getForgotPassword = (req, res, next) => {
    // Flash messages for error handling
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('page/forgotPassword', {
        pageTitle: 'Reset Password',
        errorMessage: message
    });
};

// Handle forgot password post request
exports.postForgotPassword = (req, res, next) => {
    // Generate a random token for password reset
    crypto.randomBytes(32, (err, buf) => {
        if (err) {
            return res.redirect('/forgotPassword');
        }
        const token = buf.toString('hex');

        // Find the user with the provided email
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    // If no user found, flash an error message and redirect to forgot password page
                    req.flash('error', 'No user with given email found');
                    return res.redirect('/forgotPassword');
                }

                // Set the token and token expiration for the user and save to the database
                user.token = token;
                user.tokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                // Flash success message and redirect to home page
                req.flash('error', 'Email Sent to reset password');
                // Send reset password email to the user
                let mailOptions = {
                    from: 'your_email@gmail.com', // Replace with your Gmail email
                    to: req.body.email,
                    subject: 'Reset Password',
                    html: `
                    <p>You requested for password reset</p>
                    <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password</p>
                `
                };

                return transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/');
                        console.log(info.response);
                    }
                });
            });
    });
};

// Render reset password page
exports.getResetPassword = (req, res, next) => {
    const token = req.params.token;

    // Flash messages for error handling
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    // Find the user with the provided token and valid token expiration
    User.findOne({ token: token, tokenExpiration: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                // If no user found or token expired, redirect to home page
                return res.redirect('/');
            }

            // Render the reset password page with necessary information
            res.render('page/resetPassword', {
                pageTitle: 'Reset Password',
                errorMessage: message,
                token: token,
                id: user._id.toString()
            });
        });
};

// Handle post request to reset password
exports.postResetPassword = (req, res, next) => {

    const updatedPassword = req.body.password;
    let resetUser;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // If validation errors exist, flash an error message and redirect to reset password page
        req.flash('error', errors.array()[0].msg)
        return res.status(422).redirect(`/reset/${req.body.token}`);
    }

    // Find the user with the provided token, valid token expiration, and user ID
    User.findOne({ token: req.body.token, tokenExpiration: { $gt: Date.now() }, _id: req.body.id })
        .then(user => {
            if (!user) {
                // If no user found or token expired, redirect to home page
                return res.redirect('/');
            }

            // Set the new hashed password, clear token and token expiration, and save to the database
            resetUser = user
            return bcrypt.hash(updatedPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.token = undefined;
            resetUser.tokenExpiration = undefined;

            return resetUser.save();
        })
        .then(result => {
            // Redirect to home page after successful password reset
            res.redirect('/');
        })
}
