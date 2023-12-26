# Your Project Name

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

1. Clone the repository: `git clone https://github.com/your-username/your-project.git`
2. Install dependencies: `npm install`
3. Configure MongoDB: Update the MongoDB connection URI in the `app.js` file.
4. Run the application: `npm start`
5. Open the application in your browser: `http://localhost:3000`

## Dependencies

- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database for storing user data.
- **EJS:** Templating engine for rendering dynamic HTML pages.
- **Bcrypt:** Hashing library for secure password storage.
- **Nodemailer:** Sending emails for password reset functionality.
- **CSRF:** Protection against Cross-Site Request Forgery attacks.
- **Connect-Mongo:** Store session data in MongoDB.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
