var router = require('express').Router();
var db = require.main.require('./models');

router.get('/read', async (req, res) => {
    let book = await db.Book.findOne({
        where: {
            finished: true,
        },
        order: db.sequelize.random()
    });
    if (book != null)
        res.redirect(`/b/${book.id}`);
    else
        res.send('No books have been fully written yet.');
});

const findTries = 200;

router.get('/write', require('./requireAuth'), async (req, res) => {
    let i = 0;
    while (i++ < findTries) {
        let book = await db.Book.findOne({
            where: {
                finished: false,
                public: true,
            },
            order: db.sequelize.random()
        });

        if (book == null)
            return res.send('There are no public unfinished books to contribute to.');

        if (await db.Page.count({
            where: {
                author: req.user.id,
                book: book.id
            }
        }) < book.maxPagesPerPerson)
            return res.redirect(`/b/${book.id}`);
    }
    res.send(`Tried ${findTries} times to find a book you haven't reached the contribution limit for, but couldn't find anything. Refresh to try again.`);
});

module.exports = router;