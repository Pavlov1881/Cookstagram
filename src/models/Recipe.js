const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'The name must be at least 2 characters long!'],
        required: [true, 'Name is required!']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        validate: {
            validator: (value) => /^https?:\/\//gi.test(value),
            message: 'The Photo image URL must start with http:// or https://',
        }
    },
    cookingTime: {
        type: Number,
        min: [1, 'Time must be at least 1 minute!'],
        required: [true, 'Time is required!'],
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters long!'],
        required: [true, 'Description is required!'],
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
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;