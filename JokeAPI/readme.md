# Joke API Express Server

This is a simple Express.js server that provides a RESTful API for managing jokes. You can use this server to create, retrieve, update, and delete jokes.

## Features

- Get a random joke.
- Get a specific joke by its ID.
- Filter jokes by type.
- Create a new joke.
- Update (replace) a joke.
- Update (partially) a joke.
- Delete a specific joke by its ID.
- Delete all jokes (if authorized).

## Prerequisites

- **Node.js**: Ensure that you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

## Getting Started

1. **Clone the repository to your local machine:**

    ```bash
    git clone https://github.com/your-username/joke-api-server.git
    cd joke-api-server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Access the API by making requests to** `http://localhost:3000`.

## API Endpoints

- **GET /random**: Get a random joke.
- **GET /jokes/:id**: Get a specific joke by its ID.
- **GET /filter?type=<jokeType>**: Get jokes by filtering on the joke type.
- **POST /jokes**: Create a new joke.
- **PUT /jokes/:id**: Update (replace) a joke by its ID.
- **PATCH /jokes/:id**: Update (partially) a joke by its ID.
- **DELETE /jokes/:id**: Delete a specific joke by its ID.
- **DELETE /all?key=<masterKey>**: Delete all jokes (requires the master key for authorization).

## Usage

- To create a new joke, make a `POST` request to `/jokes` with the necessary data.
- To update a joke, use `PUT` to replace the entire joke or `PATCH` to partially update it.
- To delete a joke, send a `DELETE` request to `/jokes/:id`.

## Folder Structure
- `index.js`: The main application file.
- `package.json`: Dependencies and scripts.

## Dependencies

- [Express.js](https://expressjs.com/): Web application framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware for parsing request bodies.
- [EJS](https://ejs.co/): Embedded JavaScript templating.

