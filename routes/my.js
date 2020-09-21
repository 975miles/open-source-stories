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

    res.render('my', {
        title: 'Your books',
        books
    });
});

router.get('/pages', async (req, res) => {
    let pages = await db.Page.findAll({
        where: {
            author: req.user.id
        }
    });

    let books = [];
    let booksFound = [];
    
    for (let page of pages) {
        if (booksFound.includes(page.book))
            continue;
        booksFound.push(page.book);
        let book = await db.Book.findOne({
            where: {
                id: page.book
            }
        });
        if (!book.finished)
            book.pagesDone = await db.Page.count({
                where: {
                    book: book.id
                }
            });
        books.push(book);
    }

    res.render('my', {
        title: 'Books you\'ve written for',
        books
    });
});

module.exports = router;