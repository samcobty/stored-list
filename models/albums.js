const mongoose = require('mongoose');

const albumsSchema = new mongoose.Schema({
    title: String,
    artist: String,
    link: String
});

module.exports = mongoose.model('Albums', albumsSchema);