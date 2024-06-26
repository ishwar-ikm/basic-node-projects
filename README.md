# Node.js Learning Projects Repository

Welcome to my Node.js learning projects repository! This repository contains a collection of Node.js projects I worked on during my learning journey. Each project is a separate folder in this repository, and you can explore them to see what I've learned and accomplished.

## Projects

### Project 1: QR code generator
- **Description**: This Node.js project prompts users to input a website URL, then generates a QR code image representing the URL and saves it as 'qr.png'. It also stores the URL in a text file named 'URL.txt.'
- **Technologies Used**: Node.js, Express.js, ejs.
- **Link to Project Folder**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/QR-code-generator)

### Project 2: Sun Safe Tracker
- **Description**: This project is designed to provide users with real-time information about the UV (Ultraviolet) ray index in their current location. Users can input their latitude and longitude coordinates through a simple web form. Upon submission, the system retrieves the UV index data from an external source, such as the OpenUV API. The retrieved UV index is then displayed on the web page, along with corresponding safety recommendations tailored to the UV index level.
- **Technologies Used**: Node.js, Express.js, ejs, Axios.
- **Link to Project Folder**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/Sun%20Safe%20Tracker)

### Project 3: Joke API Express Server
- **Description**: This project is a simple Express.js server that provides a RESTful API for managing jokes. Users can interact with the API to get random jokes, retrieve specific jokes by ID, filter jokes by type, create new jokes, update existing jokes, and delete jokes. It also includes the ability to delete all jokes with authorization using a master key.
- **Technologies Used**: Node.js, Express.js, body-parser, EJS.
- **Link to Project Repository**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/JokeAPI)

### Project 4: Blog Web Application
- **Description**: This project is a simple blog web application built with Node.js, Express, and EJS templates. It allows you to create, edit, and delete blog posts. Users can view a list of blog posts on the main page, create new blog posts, edit existing posts, and delete blog posts. It also serves static CSS files for styling the application.
- **Technologies Used**: Node.js, Express.js, EJS, Axios.
- **Link to Project Repository**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/Blog%20Web%20Application)

### Project 5: ToDo App
- **Description**: The ToDo App is a straightforward task management application developed using Node.js and Express. It follows the MVC (Model-View-Controller) pattern for a well-structured and modular codebase. Users can easily add, edit, and delete tasks, as well as mark them as completed. The application features a responsive design and uses EJS templates for dynamic HTML rendering. Tasks are stored persistently in a JSON file, providing a seamless user experience for managing to-do items.
- **Technologies Used**: Node.js, Express.js, EJS.
- **Front-End Code Source**: The front-end code for this project was adapted from [Node.js and Express.js Course by John Smilga](https://github.com/john-smilga/node-express-course/tree/main/03-task-manager/final/public).
- **Link to Project Repository**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/ToDo%20app)

### Project 6: Top Games Website
- **Description**: The Top Games Collection is a web application built using Node.js and Express.js. It provides a platform for users to manage and explore their favorite games. The application implements CRUD (Create, Read, Update, Delete) operations, allowing users to add new games, edit existing ones, and delete entries. It follows the MVC (Model-View-Controller) pattern, ensuring a well-organized and modular codebase. The user interface is designed to be intuitive, and Bootstrap is utilized for responsive and visually appealing styling. MongoDB serves as the backend database to persistently store game data.
- **Technologies Used**: Node.js, Express.js, MongoDB, Mongoose, EJS, Bootstrap.
- **Link to Project Repository**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/Top%20games)

### Project 7: [Log In page]
- **Description**: This log in web application built using Node.js, Express.js, and MongoDB. It focuses on providing a secure and user-friendly authentication system with features like user registration, login, logout, password reset, and authorization. The project follows the MVC (Model-View-Controller) architecture to ensure a well-organized and modular codebase.

    - **Features:**
      - **User Registration:** Allows users to sign up by providing their email and password. Passwords are securely hashed before storage.
      - **User Login:** Provides a secure login mechanism with email and password verification.
      - **Password Reset:** Enables users to request a password reset via email and securely reset their password.
      - **Authorization Middleware:** Custom middleware ensures that certain routes are accessible only to logged-in users.
      - **Flash Messages:** Utilizes connect-flash to display informative messages to users.

- **Technologies Used**: Node.js, Express.js, MongoDB, Mongoose, EJS, Bcrypt, Nodemailer, Connect-Flash, CSRF protection.
- **Link to Project Repository**: [[Link to the folder]](https://github.com/ishwar-ikm/basic-node-projects/tree/main/Log%20In%20page)


### Project 8: Car Rental Web Application

- **Description**: This project is a web application for car rental services. It allows users to browse available cars, view car details, place orders, and manage their rentals. The application is built using Node.js, Express.js, and MongoDB. It follows the MVC (Model-View-Controller) architecture to ensure a well-organized and modular codebase.

    - **Features:**
      - **User Authentication:** Users can sign up for an account, log in, and log out securely.
      - **Browse Cars:** Users can view a list of available cars for rent.
      - **View Car Details:** Users can view detailed information about each car.
      - **Rent Cars:** Users can rent cars by specifying the rental duration and payment mode.
      - **Manage Rentals:** Users can view their rental history, cancel existing orders, and manage their profile.

- **Technologies Used**: Node.js, Express.js, MongoDB, Mongoose, EJS, Bcrypt.js, express-session, connect-mongodb-session, Middleware.

- **Link to Project Repository**: [Car Rental Web Application](https://github.com/ishwar-ikm/basic-node-projects/tree/main/Car%20Rental%20Web%20Application)

...

## How to Run

Each project may have its own set of instructions on how to run it. Please navigate to the specific project folder and refer to the project's `README.md` or documentation for detailed instructions on setting up and running the project.
