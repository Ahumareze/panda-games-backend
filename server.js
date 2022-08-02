//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//models
const Collection = require('./models/collection');
const Game = require('./models/game');

//data
const collections = require('./data/collections');

//initialization
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//connect to mongodb
// const dbUrl = process.env.dbUrl;
// mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(r => {
//     console.log('connected to db ' + r);
//     app.listen(PORT);
// })
// .catch(e => console.log(e));

// add collection function //
app.post('/api/add-collection', (req, res) => {
    const data = req.body;

    const collection = new Collection({
        title: data.title,
        name: data.name,
        link: data.link,
        image: data.image,
        miniImage: data.miniImage,
        details: data.details
    });

    collection.save().then(r => {
        res.status(201).json(r)
    })
    .catch(e => {
    res.status(404).json({message: "Error sending data"})
    })
});

// fetch collections function //
app.get('/api/collections', (req, res) => {
    res.status(201).json(collections);
});

// add game function //
app.post('/api/add-game', (req, res) => {
    const data = req.body;

    const game = new Game({
        name: data.name,
        price: data.price,
        images: data.images,
        description: data.description,
        platforms: data.platforms,
        developers: data.developers,
        releaseDate: data.releaseDate,
        category: data.category,
        categoryLink: data.categoryLink
    });

    game.save().then(r => {
        res.status(201).json(r)
    }).catch(e => {
        res.status(404).json({message: 'error posting game'})
    })
});

// fetch games function //
app.get('/api/games', (req, res) => {
    Game.find().then(r => {
        res.status(201).json(r)
    }).catch(e => {
        res.status(404).json({message: "error fetching game"})
    })
});