var router = require('express').Router();

//all routes which don't require authentication to use
router.use('/', require('./auth'));
router.use('/', require('./home'));
router.use('/', require('./library'));
router.use('/b', require('./book'));

//function to require authentication to all routes after this
router.use((req, res, next) => {
    if (req.user == undefined) //if user is not logged in
        res.render('auth-needed', {returnTo: req.originalUrl});
    else
        next();
});

//all routes which require authentication to use

module.exports = router;