const mongoose = require('mongoose');
const schema = mongoose.Schema;

const collectionSchema = new schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    miniImage: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
});

const Collection = mongoose.model('collection', collectionSchema);

module.exports = Collection;

