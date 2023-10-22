// Import necessary libraries
import express from "express"; // Import the Express.js framework
import bodyParser from "body-parser"; // Import the body-parser middleware for parsing request data

// Create an Express application
const app = express(); // Initialize the Express app
const port = 4000; // Define the port on which the server will listen

// In-memory data store for blog posts
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3; // Initialize the last used ID for new posts

// Middleware for parsing request data
app.use(bodyParser.urlencoded({ extended: true })); // Enable URL-encoded form data parsing
app.use(bodyParser.json()); // Enable JSON data parsing

// Define routes and their corresponding handlers

// GET all posts
app.get("/posts", (req, res) => {
  // Respond to a GET request to /posts
  res.json(posts); // Return the list of blog posts as JSON
});

// GET a specific post by ID
app.get("/posts/:id", (req, res) => {
  // Respond to a GET request to /posts/:id, where :id is a parameter in the URL
  const post = posts.find((p) => p.id === parseInt(req.params.id)); // Find the blog post by its ID
  if (!post) return res.status(404).json({ message: "Post not found" }); // If the post doesn't exist, return a 404 error
  res.json(post); // Otherwise, return the requested blog post as JSON
});

// POST a new post
app.post("/posts", (req, res) => {
  // Respond to a POST request to /posts
  const newId = lastId + 1; // Generate a new ID for the post
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId; // Update the last used ID
  posts.push(post); // Add the new post to the in-memory store
  res.status(201).json(post); // Return the newly created post and set the HTTP status to 201 (Created)
});

// PATCH a post to update individual fields
app.patch("/posts/:id", (req, res) => {
  // Respond to a PATCH request to /posts/:id, where :id is a parameter in the URL
  const post = posts.find((p) => p.id === parseInt(req.params.id)); // Find the blog post by its ID
  if (!post) return res.status(404).json({ message: "Post not found" }); // If the post doesn't exist, return a 404 error

  // Update the post's title, content, or author if provided in the request
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post); // Return the updated blog post as JSON
});

// DELETE a specific post by providing the post ID
app.delete("/posts/:id", (req, res) => {
  // Respond to a DELETE request to /posts/:id, where :id is a parameter in the URL
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id)); // Find the index of the blog post in the array
  if (index === -1) return res.status(404).json({ message: "Post not found" }); // If the post doesn't exist, return a 404 error

  posts.splice(index, 1); // Remove the post from the array
  res.json({ message: "Post deleted" }); // Return a success message
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
