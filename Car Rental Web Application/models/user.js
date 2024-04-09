const mongoose = require('mongoose'); // Importing mongoose library

const Schema = mongoose.Schema; // Getting mongoose's Schema class

// Define the schema for users
const userSchema = new Schema({
  email: {
    type: String, // Email of the user (String)
    required: true // Must be provided
  },
  
  password: {
    type: String, // Password of the user (String)
    required: true // Must be provided
  },

  username: {
    type: String, // Username of the user (String)
    required: true // Must be provided
  },

  firstName: {
    type: String, // First name of the user (String)
    required: true // Must be provided
  },

  lastName: {
    type: String, // Last name of the user (String)
    required: true // Must be provided
  },

  gender: {
    type: String, // Gender of the user (String)
    required: true // Must be provided
  }
});

// Export the model based on the schema
module.exports = mongoose.model('User', userSchema);
