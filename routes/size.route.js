var express = require('express')
var router = express.Router();
const { getAllsize, getAllsizeById,  addSizes, updateSizes, deleteSizes } = require('../controllers/size.controllers');
const { body } = require('express-validator');

router.get('/all', getAllsize);

router.get('/find/id:', getAllsizeById);

router.post('/add', addSizes);

router.post('/update', updateSizes);

router.delete('/delete', deleteSizes);

// router.search('/search', searchUser);

module.exports = router;

