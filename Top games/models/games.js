const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    recommendation: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    detail_description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Game', gameSchema);