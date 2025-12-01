var express = require('express');
var router = express.Router();
const Albums = require('../models/albums');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const albums = await Albums.find();
        res.render('index', { title: 'Express', albums: albums});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
