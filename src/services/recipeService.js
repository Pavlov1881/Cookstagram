
// exports.getAll = () => Game.find();

// exports.create = (gameData) => Game.create(gameData);

// exports.getById = (gameId) => Game.findById(gameId);

// exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

// exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

// exports.isBuyer = async (gameId, userId) => {
//     const game = await Game.findById(gameId);
//     return game.boughtBy.includes(userId);
// };

// exports.buy = async (gameId, userId) => {
//     const game = await Game.findById(gameId);
//     game.boughtBy.push(userId);
//     game.save();
// };

// exports.search = async (name, platform) => {

//     let result = await Game.find().lean();

//     if (name) {
//         result = result.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
//     }

//     if (platform) {
//         result = result.filter(game => game.platform.toLowerCase().includes(platform.toLowerCase()));
//     }

//     return result;
// }

// exports.addComment = async (photoId, commentData) => {
//     const photo = await Photo.findById(photoId);
//     photo.commentsList.push(commentData);

//     return photo.save();
// };

//! import model

const Recipe = require('../models/Recipe');

exports.getAll = () => Recipe.find();

exports.create = (recipeData) => Recipe.create(recipeData);

exports.getOne = (recipeId) => Recipe.findById(recipeId);