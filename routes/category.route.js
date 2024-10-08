var express=require('express')
var router=express.Router();
const{ getAllcategory,getAllcategoryById,addcategory,updatecategory,deletecategory}=require('../controllers/category.controller');
const { body } = require('express-validator');

router.get('/all', getAllcategory);

router.post('/add',
    [body('Name').notEmpty().withMessage("Name is Requird Field").trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    ],
    addcategory);

 router.get('/find/:id', getAllcategoryById)

 router.post('/update/:id',[body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
], updatecategory);

 router.delete('/delete/:id', deletecategory);

// router.search('/search', searchUser);


module.exports = router;

