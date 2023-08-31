const jwt = require('../lib/jsonWebToken');
const { SECRET } = require('../constants');

exports.authMiddleware = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {

        try {
            const decodetToken = await jwt.verify(token, SECRET);
            req.user = decodetToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodetToken;

        } catch (error) {
            res.clearCookie('auth');
            return res.status(401).render('home/404');
        }
    }

    next();
}


exports.isLogged = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
}