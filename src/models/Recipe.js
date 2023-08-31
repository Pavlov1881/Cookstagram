const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
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
            message: 'The image URL must start with http:// or https://',
        }
    },
    cookingTime: {
        type: Number,
        min: [0, 'Time should be a positive number'],
        required: [true, 'Price is required!'],
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters long!'],
        required: [true, 'Description is required!'],
    },
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

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;