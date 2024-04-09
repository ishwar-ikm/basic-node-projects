const mongoose = require('mongoose'); // Importing mongoose library

const Schema = mongoose.Schema; // Getting mongoose's Schema class

// Define the schema for cars
const carSchema = new Schema({
  name: {
    type: String, // Name of the car (String)
    required: true // Must be provided
  },
  
  ppd: {
    type: Number, // Price per day (Number)
    required: true // Must be provided
  },

  pph: {
    type: Number, // Price per hour (Number)
    required: true // Must be provided
  },

  ppkm: {
    type: Number, // Price per kilometer (Number)
    required: true // Must be provided
  },

  stock: {
    type: Number, // Number of cars in stock (Number)
    required: true // Must be provided
  },
  
  description: {
    type: String, // Description of the car (String)
    required: true // Must be provided
  },
  
  imageUrl: {
    type: String, // URL of the car image (String)
    required: true // Must be provided
  },
  
  userId: {
    type: Schema.Types.ObjectId, // Reference to the user who owns the car (ObjectId)
    ref: 'User', // Refers to the User model
    required: true // Must be provided
  }
});

// Export the model based on the schema
module.exports = mongoose.model('Car', carSchema);
