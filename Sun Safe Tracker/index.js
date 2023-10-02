import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Configuration for the OpenUV API request.
const config = {
    headers: {
        // Replace "YOUR_API_KEY_HERE" with your actual OpenUV API key.
        "x-access-token": "YOUR_API_KEY_HERE",
    },
};

// Serve static files from the "public" directory (e.g., CSS files).
app.use(express.static("public"));

// Parse incoming request bodies with form data.
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests to the root URL ("/") and render the "index.ejs" template.
app.get("/", (req, res) => {
    // Render the "index.ejs" template for the root URL ("/").
    res.render("index.ejs");
});

// Handle POST requests to the "/submit" URL for retrieving UV data.
app.post("/submit", async (req, res) => {
    // Extract latitude and longitude values from the form data.
    const lat = req.body["lat"];
    const long = req.body["long"];

    try {
        // Make an asynchronous request to the OpenUV API to get UV data based on latitude and longitude.
        const result = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}&alt=100&dt=`, config);
        
        // Extract and render the UV data from the API response.
        res.render("index.ejs", { data: JSON.stringify(result.data["result"]["uv"]) });
    } catch (error) {
        // Handle errors or invalid input by rendering an error message in "index.ejs".
        res.render("index.ejs", { data: "Enter valid latitude and longitude values" });
    }
});

// Start the Express app and listen on the specified port.
app.listen(port, () => {
    console.log("Server started on port", port);
});
