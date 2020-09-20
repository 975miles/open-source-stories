var router = require('express').Router();

//function to require authentication for a route
const requireAuth = require('./requireAuth');

router.use('/', require('./auth'));
router.use('/', require('./home'));
router.use('/b/new', requireAuth, require('./new-book'));
router.use('/b/random', require('./random-book'));
router.use('/b', require('./book'));
router.use('/my', requireAuth, require('./my'));
router.use('/', require('./library'));

module.exports = router;