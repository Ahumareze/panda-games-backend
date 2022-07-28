const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gameSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        require: true
    },
    images: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        require: true
    },
    platforms: {
        type: Array,
        required: true
    },
    developers: {
        type: String,
        require: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    category: {
        type: String,
        require: true
    },
    categoryLink: {
        type: String,
        require: true
    },
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game