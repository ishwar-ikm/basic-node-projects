const mongoose = require('mongoose'); // Importing mongoose library

const Schema = mongoose.Schema; // Getting mongoose's Schema class

// Define the schema for orders
const orderSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId, // Reference to the car being ordered (ObjectId)
        ref: 'Car', // Refers to the Car model
        required: true // Must be provided
    },

    userId: {
        type: Schema.Types.ObjectId, // Reference to the user placing the order (ObjectId)
        ref: 'User', // Refers to the User model
        required: true // Must be provided
    },

    mode: { 
        type: String, // Payment mode for the order (String)
        required: true // Must be provided
    },

    amount: { 
        type: Number, // Total amount of the order (Number)
        required: true // Must be provided
    }
});

// Export the model based on the schema
module.exports = mongoose.model('Order', orderSchema);
