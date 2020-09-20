var router = require('express').Router();
var db = require.main.require('./models');
let maxPages = 5000;
const limits = {
    title: {
        min: 5,
        max: 100,
    },
    pages: {
        min: 1,
        max: maxPages
    },
    maxPagesPerPerson: {
        min: 1,
        max: maxPages,
    },
    viewDistance: {
        min: 0,
        max: 1000
    },
    maxPageLength: {
        min: 1,
        max: 1500,
    },
};

const fields = [
    ['title', 'string', true],
    ['pages', 'int', true],
    ['maxPagesPerPerson', 'int', true],
    ['allowText', 'boolean', false],
    ['allowDrawing', 'boolean', false],
    ['defaultPageType', 'string', false],
    ['maxPageLength', 'int', true],
    ['viewDistance', 'int', true],
    ['titleAlwaysVisible', 'boolean', false],
    ['public', 'boolean', false],
];

router.get('/', (req, res) => {
    res.render('new-book', {limits});
});

router.post('/', async (req, res) => {
    for (let i of fields) {
        if (!req.body.hasOwnProperty(i[0]))
            return res.json(`${i[0]} is not set.`);
        let val = req.body[i[0]];

        switch (i[1]) {
            case 'int':
                if (typeof val != 'number' || !Number.isInteger(val))
                    return res.json(`${i[0]} must be an integer.`);
                break;
            
            default:
                if (typeof val != i[1])
                    return res.json(`${i[0]} must be of type ${i[1]}.`);
        }

        if (i[2]) {
            let limit = limits[i[0]];
            switch (i[1]) {
                case 'int':
                    if (val < limit.min || val > limit.max)
                        return res.json(`${i[0]} must be ${limit.min}-${limit.max}.`);
                    break;

                case 'string':
                    if (val.length < limit.min || val.length > limit.max)
                        return res.json(`${i[0]} must be ${limit.min}-${limit.max} character(s) long.`);
                    break;
            }
        }
    }

    if (!(req.body.allowText || req.body.allowDrawing)) //if no page types are allowed
        return res.json('You must allow at least one page type.');

    if (!(['Text', 'Drawing'].includes(req.body.defaultPageType)))
        return res.json('Invalid default page type.');
    
    if ((!req.body.allowText && req.body.defaultPageType == 'Text') || (!req.body.allowDrawing && req.body.defaultPageType == 'Drawing'))
        return res.json('The default page type must be an allowed page type.');


    let newBook = {
        owner: req.user.id,
        finished: false,
    };

    for (let i of fields)
        newBook[i[0]] = req.body[i[0]];
    
    console.log(newBook);
    
    await db.Book.create(newBook);
    
    res.json(true);
});

module.exports = router;