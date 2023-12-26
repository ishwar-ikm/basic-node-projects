const mongoose = require('mongoose');

// Define a schema for the 'User' collection
const Schema = mongoose.Schema;

// Define the structure of the 'User' schema
const userSchema = new Schema({
    // User email, which is a required field
    email: {
        type: String,
        required: true
    },

    // User password, which is a required field
    password: {
        type: String,
        required: true
    },

    // Token for password reset functionality
    token: String,

    // Expiration date for the password reset token
    tokenExpiration: Date
});

// Export the 'User' model based on the defined schema
module.exports = mongoose.model('User', userSchema);
