var express = require('express');
var router = express.Router();
const { addproduct, getAllproduct ,getAllproductById, updateproduct, deleteproduct} = require('../controllers/product.controller');
const { body } = require('express-validator');
const upload = require('../middleware/fileUpload.middleware');
/* GET users listing. */
router.get('/all', getAllproduct);
router.post('/add',upload.single('productimage'),
    [body('Name').notEmpty().withMessage("Name is Requird Field").trim()
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 50 characters long'),
    ],addproduct);

router.get('/find/:id',getAllproductById);
router.post('/update/:id',[body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
], updateproduct);
router.delete('/delete/:id',deleteproduct);
// router.search('/search', searchUser);


module.exports = router;
