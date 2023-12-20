# Top Games Collection

## Description
This web application serves as a Top Games Collection where users can manage and explore their favorite games. It provides a range of features, including CRUD operations, to make it easy for users to add, edit, and delete games.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing game data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **EJS (Embedded JavaScript)**: Templating engine for rendering dynamic content.
- **Bootstrap**: Front-end CSS framework for styling.

## Features

### 1. View List of Games
- Users can access a main page that displays a list of top games.
- Each game in the list includes its title, image, rating, and a brief description.

### 2. View Detailed Information
- Users can click on a specific game to view detailed information about that game.
- The detailed information includes a more extensive description of the game.

### 3. Add New Games
- Users can add new games to the collection.
- The application provides a user-friendly form for entering game details, such as title, image URL, rating, and descriptions.

### 4. Edit Existing Games
- Users can edit the details of existing games.
- An edit button on each game allows users to update the title, image URL, rating, and descriptions.

### 5. Delete Games
- Users can delete games from the collection.
- A delete button is available for each game, allowing users to remove unwanted entries.

### 6. User-Friendly Interface
- The application is designed with a clean and intuitive interface for a seamless user experience.
- Bootstrap is used for styling, providing a responsive and visually appealing design.

## Project Structure

- **`/routes`**: Contains route definitions for Express.
  - `route.js`: Defines the application routes and maps them to controller functions.

- **`/controller`**: Contains controller functions for handling route logic.
  - `controller.js`: Implements functions for rendering views and handling CRUD operations.

- **`/models`**: Defines MongoDB models for the game data.
  - `games.js`: Schema and model for the game collection.

- **`/views/page`**: Contains EJS templates for rendering HTML views.
  - `addGame.ejs`: Form for adding and editing a new game.
  - `index.ejs`: Main page displaying the list of games.
  - `page.ejs`: Page displaying detailed information about a specific game.

- **`/public`**: Contains static assets like CSS files.
  - `/css`: Stylesheets for styling the application.

## Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up a MongoDB database and update the connection string in `app.js`.
4. Run the application using `npm start`.

## Usage
- Access the application at `http://localhost:3000`.
- Explore the list of top games, view details, add new games, edit existing games, and delete games as needed.
