var express=require('express')
var router=express.Router();
const{getAll,addcolor,getAllById, updatecolor, deletecolor}=require('../controllers/color.controller');
const { body } = require('express-validator');
const upload = require('../middleware/fileUpload.middleware');

router.get('/all',getAll);
router.get('/find/:id',getAllById)
router.post('/add', upload.array('images',10),
    [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must contain only alphabets and spaces").trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    ],
    addcolor);


 router.post('/update/:id', [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
], updatecolor);
 router.delete('/delete/:id',  deletecolor);
// router.search('/search', searchUser);


module.exports = router;

