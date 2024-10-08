var express = require('express');
var router = express.Router();
const { getAllmaster, addmaster, getAllmasterById, updatemaster, deletemaster, searchUser } = require('../controllers/master.controller');
const { body } = require('express-validator');
const upload = require('../middleware/fileUpload.middleware');
/* GET users listing. */
router.get('/all', getAllmaster);
router.post('/add', upload.single('masterimage'),
    [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    ], addmaster);
router.get('/find/:id', getAllmasterById);

router.put('/update/:id', [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long')
], updatemaster);

router.delete('/delete/:id', deletemaster);
// router.search('/search', searchUser);

module.exports = router;
