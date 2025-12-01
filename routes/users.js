var express = require('express');
var router = express.Router();
const Albums = require('../models/albums');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', async function(req, res) {
    try {
        const albums = await Albums.find();
        res.json(albums);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
