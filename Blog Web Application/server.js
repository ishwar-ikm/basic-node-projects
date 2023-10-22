// Import necessary libraries
import express from "express"; // Import the Express.js framework
import bodyParser from "body-parser"; // Import the body-parser middleware for parsing request data
import axios from "axios"; // Import the Axios library for making HTTP requests

// Create an Express application
const app = express(); // Initialize the Express app
const port = 3000; // Define the port on which the server will listen
const API_URL = "http://localhost:4000"; // Define the URL of the API server

// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware for parsing request data
app.use(bodyParser.urlencoded({ extended: true })); // Enable URL-encoded form data parsing
app.use(bodyParser.json()); // Enable JSON data parsing

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    // Send a GET request to the API server to fetch all posts
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    // Render the "index.ejs" template with the fetched posts and send it to the client
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the page for creating a new post
app.get("/new", (req, res) => {
  // Render the "modify.ejs" template for creating a new post
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// Route to render the page for editing a post
app.get("/edit/:id", async (req, res) => {
  try {
    // Send a GET request to the API server to fetch a specific post by ID
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    // Render the "modify.ejs" template with the fetched post data for editing
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    // Send a POST request to the API server to create a new post with the provided data
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    // Redirect the client back to the main page after creating the post
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    // Send a PATCH request to the API server to partially update a specific post by ID
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    // Redirect the client back to the main page after updating the post
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    // Send a DELETE request to the API server to delete a specific post by ID
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    // Redirect the client back to the main page after deleting the post
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
