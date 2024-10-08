var express = require('express');
var router = express.Router();
// const { addreviews, getAllreviews ,getAllreviewsById, updatereviews, deletereviews} = require('../controllers/reviews.controllers');
const { body } = require('express-validator');
const upload = require('../middleware/fileUpload.middleware');
/* GET users listing. */
// router.get('/all', getAllreviews);
// router.post('/add',upload.array('reviewsimage',10),
//    addreviews);

// router.get('/find/:id',getAllreviewsById);
// router.post('/update/:id',[body('Name').notEmpty().withMessage("Name is Requird Field").isAlpha().withMessage("Name must be in char only")
//     .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters long'),
// ], updatereviews);
// router.delete('/delete/:id',  deletereviews);
// router.search('/search', searchUser);


module.exports = router;
