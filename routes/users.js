var express = require('express');
var router = express.Router();
const Albums = require('../models/albums');

/* GET users listing. */
router.get('/', async function(req, res, next) {
   try {
        const albums = await Albums.find();
        res.json(albums);
    } catch (error) {
        console.log(error);
    }
})
;

router.get('/all', async function(req, res) {
    try {
        const albums = await Albums.find();
        res.json(albums);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async function (req, res){
    const id = req.params.id;
    try {
        const albums = await Albums.find({ _id: id });
        res.json(albums);
    } catch (error) {
        console.log(error);
        res.send('Something went wrong');
    }
})

router.post('/', async function (request, response) {
    console.log(request.body);

    try {
        const newFields = {
            ...request.body,
            createdAt: new Date(),
            value: 0.25,
        }
        console.log(newFields)
        const newAlbums = await Albums.create(newFields);
        response.json(newAlbums);
    }  catch (error) {
        console.log(error);
        res.send('Something went wrong');
    }

})

router.delete('/:id', async function(request, response) {
    try {
        const deletedItem = await Albums.findByIdAndDelete(request.params.id)
        response.json(deletedItem); 
    } catch(error) {
        console.log(error);
        response.send('something went wrong')
    }
})

router.put('/:id', async function(request, response) {
    console.log(request.params.id);
    console.log(request.body);

    try {
        const updatedItem = await Albums.findByIdAndUpdate(
            request.params.id,
            {
                ...request.body
            }
        )
        response.json(updatedItem);
    } catch (error) {
        console.log(error);
        response.send('something went wrong')
    }
});

module.exports = router;
