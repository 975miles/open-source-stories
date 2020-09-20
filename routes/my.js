var router = require('express').Router();
var db = require.main.require('./models');

router.get('/books', async (req, res) => {
    let books = await db.Book.findAll({
        where: {
            owner: req.user.id
        }
    });
    
    for (let book of books)
        if (!book.finished)
            book.pagesDone = await db.Page.count({
                where: {
                    book: book.id
                }
            });

    res.render('my/books', {books});
});

router.get('/pages', (req, res) => {
    res.render('my/pages');
});

module.exports = router;