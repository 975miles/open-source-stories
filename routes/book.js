var router = require('express').Router();

router.get('/', (req, res) => {
    res.send('this will find a random book')
});

router.get('/:bookId', (req, res) => {
    res.render('contribute');
});

module.exports = router;