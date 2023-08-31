const router = require('express').Router();
const authService = require('../services/authService');
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {

        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }


});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    try {
        const { email, username, password, confirmPassword } = req.body;
        const token = await authService.register(email, username, password, confirmPassword);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) })
    }

});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

router.get('/profile', isLogged, (req, res) => {
    res.render('auth/profile');
});


module.exports = router;