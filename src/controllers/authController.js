const router = require('express').Router();
const authService = require('../services/authService');
const { isLogged } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);

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
        const { username, email, password, repeatPassword } = req.body;
        const token = await authService.register(username, email, password, repeatPassword);

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
    res.render('src/auth/profile');
});


module.exports = router;