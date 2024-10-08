var express=require('express')
var router=express.Router();
const{getAllsubcat,addsubcat,getAllsubcatById, updatesubcat, deletesubcat}=require('../controllers/subcat.contoller');
const { body } = require('express-validator');

router.get('/all',getAllsubcat);
router.get('/find/:id',getAllsubcatById)
router.post('/add',
    [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only").trim()
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
    ],
    addsubcat);


 router.post('/update/:id', [body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
], updatesubcat);
 router.delete('/delete/:id',  deletesubcat);
// router.search('/search', searchUser);


module.exports = router;

