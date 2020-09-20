var router = require('express').Router();
var db = require.main.require('./models');
const IdentificatorStrategy = require('passport-identificator').Strategy

router.get('/:bookId', async (req, res) => {
    let books = await db.Book.findAll({
        where: {
            id: req.params.bookId
        }
    });

    if (books.length == 0) {
        res.send('No book found with that ID.');
    } else {
        let book = books[0];
        if (book.finished) {
            let pages = await db.Page.findAll({
                where: {
                    book: book.id
                }
            });
            res.render('read', {book, pages});
        } else {
            if (req.user == undefined)
                return res.render('auth-needed');
            let pagesSubmittedByUser = await db.Page.count({
                where: {
                    book: book.id,
                    author: req.user.id
                }
            });
            if (pagesSubmittedByUser >= book.maxPagesPerPerson)
                return res.send('You\'ve reached the page limit for this book, you can\'t submit any more pages. Come back here when the book is done to read the finished result.');
            let pages = await db.Page.findAll({
                where: {
                    book: book.id
                },
                order: [['pageNum', 'DESC']],
                limit: book.viewDistance
            });
            pages.reverse();
            res.render('contribute', {book, pages});
        }
    }
});

router.post('/:bookId', require('./requireAuth'), async (req, res) => {
    let books = await db.Book.findAll({
        where: {
            id: req.params.bookId
        }
    });

    if (books.length == 0) {
        return res.json('No book found with that ID.');
    } else {
        let book = books[0];
        let pagesSubmittedByUser = await db.Page.count({
            where: {
                book: book.id,
                author: req.user.id
            }
        });

        if (pagesSubmittedByUser >= book.maxPagesPerPerson)
            return res.json('You\'ve reached the page limit for this book, you can\'t submit any more pages.');
        
        if (!req.body.hasOwnProperty('page') || typeof req.body.page != 'number' || !Number.isInteger(req.body.page))
            return res.json('page was not set');
        if (!req.body.hasOwnProperty('type') || typeof req.body.type != 'string' || !(['Text', 'Drawing'].includes(req.body.type)))
            return res.json('type was not set');
        if (!req.body.hasOwnProperty('data') || typeof req.body.data != 'string' || req.body.data.length > 100000)
            return res.json('data was not set or too long');
        
        let lastPage = await db.Page.findOne({
            where: {
                book: book.id
            },
            order: [['pageNum', 'DESC']]
        });
        let lastPageNum = lastPage != null ? lastPage.pageNum : 0; //make the last page number the page number of the most recent page, or if there are no pages, 0

        if (req.body.page !== lastPageNum + 1)
            return res.json('In the time it took you to make that page, someone else made it. Refresh to get a new page number.');
        
        if ((req.body.type == 'Text' && !book.allowText) || (req.body.type == 'Drawing' && !book.allowDrawing))
            return res.json('that page type is not allowed in this book');
        
        if (req.body.type == 'Text' && book.maxPageLength < req.body.data.length)
            return res.json('text exceeded limit');
        
        await db.Page.create({
            author: req.user.id,
            book: book.id,
            type: req.body.type,
            content: req.body.data,
            pageNum: req.body.page
        });

        if (req.body.page >= book.pages) {
            await db.Book.update({
                finished: true,
            }, {
                where: {
                    id: book.id
                }
            });
        }
        
        res.json(true);
    }
});

module.exports = router;