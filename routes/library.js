var router = require('express').Router();

router.get('/library', (req, res) => {
    res.render('library');
});

module.exports = router;