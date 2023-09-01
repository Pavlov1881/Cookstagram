const router = require('express').Router();
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const recipeService = require('../services/recipeService');


router.get('/catalog', async (req, res) => {
    try {
        const allRecipes = await recipeService.getAll().lean().populate('owner');

        res.render('recipes/catalog', { allRecipes });
    } catch (error) {
        res.render('/', { error: getErrorMessage(error) });
    }
});

router.get('/add', isLogged, (req, res) => {
    res.render('recipes/addRecipe');
});

router.post('/add', isLogged, async (req, res) => {
    try {
        const ownerId = req.user._id;
        const recipeData = { ...req.body, owner: ownerId };

        await recipeService.create(recipeData);
        res.redirect('/recipes/catalog');

    } catch (error) {
        res.render('recipes/addRecipe', { error: getErrorMessage(error) });
    }
})









router.get('.......', async (req, res) => {
    try {


        res.render('.......', {});

    } catch (error) {
        res.render('........', { error: getErrorMessage(error) });
    }
});

module.exports = router