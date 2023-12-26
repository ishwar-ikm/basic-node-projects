# Log in page

## Description

This project is a web application built with Node.js, Express, MongoDB, and EJS. It provides features for user authentication, including user registration, login, logout, and password reset functionality.

## Features

### User Authentication

- **Registration:** Users can sign up by providing their email and password. Passwords are securely hashed before storage.
- **Login:** Users can log in using their registered email and password.
- **Logout:** Users can log out, and their session is destroyed.

### Password Management

- **Forgot Password:** Users can request a password reset by providing their email. A reset link is sent to the user's email.
- **Password Reset:** Users can reset their password by clicking on the reset link received in their email.

### Authorization

- **Middleware:** Custom middleware ensures that certain routes are accessible only to logged-in users.

## Project Structure

- **Controllers:** Handle the application's logic, such as user authentication and authorization.
- **Models:** Define the structure of the MongoDB documents, including the User model.
- **Routes:** Define the application's routes, including login, registration, and password reset routes.
- **Views:** Utilize EJS templates to render the HTML views for different pages.
- **Public:** Contains static assets like stylesheets and client-side scripts.
- **Includes:** Reusable EJS partials for the head and end of HTML documents.
- **Middleware:** Custom middleware functions, such as authorization checks.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure MongoDB: Update the MongoDB connection URI in the `app.js` file.
4. Configure Nodemailer: Update email and app password for sending emails in controller/login.js in transporter function on line 8
5. Run the application: `npm start`
6. Open the application in your browser: `http://localhost:3000`

## Dependencies

- **bcrypt:** Hashing library for secure password storage.
- **body-parser:** Parse incoming request bodies in middleware.
- **connect-flash:** Store and retrieve messages in the session for displaying flash messages.
- **connect-mongodb-session:** Store session data in MongoDB.
- **csurf:** Protection against Cross-Site Request Forgery attacks.
- **ejs:** Templating engine for rendering dynamic HTML pages.
- **express:** Web framework for Node.js.
- **express-session:** Session middleware for Express.
- **express-validator:** Validator middleware for Express.
- **mongodb:** Official MongoDB driver for Node.js.
- **mongoose:** MongoDB object modeling for Node.js.
- **nodemailer:** Sending emails for password reset functionality.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

