var express = require('express')
var router = express.Router();
const { getAllmenu, getAllmenuById, addmenu, updatemenu, deletemenu } = require('../controllers/menu.controller');
const { body } = require('express-validator');

router.get('/all', getAllmenu);
router.get('/find/id:', getAllmenuById);

router.post('/add',
    [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long')
    ], addmenu);

router.post('/update/id:', [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long')
], updatemenu);

router.delete('/delete/id:', deletemenu)

// router.post('/delete/:id', deleteUser);
// router.search('/search', searchUser);


module.exports = router;

