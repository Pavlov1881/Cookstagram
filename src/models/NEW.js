const mongoose = require('mongoose');

//! change
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 4,
        required: [true, 'Name is required!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Crypto Image URL must start with http:// or https://',
        }
    },
    price: {
        type: Number,
        min: [0, 'Price should be a positive number'],
        required: [true, 'Price is required!'],
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters long!'],
        required: [true, 'Description is required!'],
    },
    genre: {
        type: String,
        minLength: [2, 'Genre should be at least 2 characters long!'],
        required: [true, 'Genre is required!'],
    },
    platform: {
        type: String,
        enum: ["PC", "Nintendo", "PS4", "PS5", "XBOX"],
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    commentsList: [{
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        commentText: {
            type: String,
            required: [true, 'Comment text is required'],
        }

    }],
});
//! change
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;