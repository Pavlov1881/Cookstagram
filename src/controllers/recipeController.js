const router = require('express').Router();
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const recipeService = require('../services/recipeService');












router.get('.......', async (req, res) => {
    try {


        res.render('.......', {});

    } catch (error) {
        res.render('........', { error: getErrorMessage(error) });
    }
});

module.exports = router