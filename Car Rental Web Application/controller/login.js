const bcrypt = require('bcryptjs'); // Importing bcryptjs for password hashing
const User = require('../models/user'); // Importing User model

// Render login page
exports.getLogin = (req, res, next) => {
  res.render('admin/login', {
    pageTitle: 'Log In',
    errorMessage: null,
    oldInput: { email: '', password: '' },
    active: 'none'
  });
};

// Handle login form submission
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email or username
  User.findOne({ $or: [{ email: email }, { username: email }] })
    .then(user => {
      if (!user) {
        // Render login page with error message if user not found
        return res.status(422).render('admin/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email, password, or username.',
          oldInput: { email: email, password: password },
          validationErrors: [],
          active: 'none'
        });
      }
      // Compare passwords
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            // Set session variables and redirect on successful login
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          // Render login page with error message if passwords don't match
          return res.status(422).render('admin/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email, password, or username.',
            oldInput: { email: email, password: password },
            validationErrors: [],
            active: 'none'
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      console.log(err);
    });
};

// Render registration page
exports.getRegister = (req, res, next) => {
  res.render('admin/register', {
    pageTitle: 'Register',
    errorMessage: null,
    oldInput: { email: '', password: '', confirmPassword: '', firstName: '', lastName: '', username: '' },
    active: 'none'
  });
}

// Handle registration form submission
exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const gender = req.body.gender;
  const confirmPassword = req.body.confirmPassword;

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(422).render('admin/register', {
      pageTitle: 'Register',
      errorMessage: "Password didn't match",
      oldInput: { email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, username: username },
      active: 'none'
    });
  }

  // Check if email already exists
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        // Render registration page with error message if email exists
        return res.status(422).render('admin/register', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Email already exists',
          oldInput: { email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, username: username },
          validationErrors: [],
          active: 'none'
        });
      } else {
        // If email doesn't exist, check for username
        User.findOne({ username: username })
          .then(user => {
            if (user) {
              // Render registration page with error message if username exists
              return res.status(422).render('admin/register', {
                path: '/login',
                pageTitle: 'Login',
                errorMessage: 'Username already exists',
                oldInput: { email: email, password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, username: username },
                validationErrors: [],
                active: 'none'
              });
            } else {
              // If both email and username are unique, hash the password and create the user
              bcrypt.hash(password, 12)
                .then(hashedPassword => {
                  // Create a new user with the hashed password and save to the database
                  const user = new User({
                    email: email,
                    password: hashedPassword,
                    username: username,
                    gender: gender,
                    firstName: firstName,
                    lastName: lastName
                  });
                  return user.save();
                })
                .then(result => {
                  // Redirect to the login page after successful registration
                  res.redirect('/login');
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
      }
    })


};

// Logout user
exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
