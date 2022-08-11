//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//models
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

//connect to mongodb
const dbUrl = process.env.dbUrl;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(r => {
    console.log('connected to db ' + r);
    app.listen(PORT);
})
.catch(e => console.log(e));

// fetch homepage data //
app.get('/api/home', (req, res) => {
    let data = {
        collections: collections.splice(0,4)
    };
    Game.find().then(r => {

        let arr = [];

        r.map(i => {
            if(i.rating > 3){
                arr.push(i)
            }
        });

        data['recomended'] = arr;
        const splicedGames = r.splice(0, 4);
        data['new'] = splicedGames;
        
        res.status(201).json(data)
    }).catch(e => {
        res.status(404).json({message: "Error fetching data"})
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
        prices: data.prices,
        images: data.images,
        description: data.description,
        platforms: data.platforms,
        developers: data.developers,
        releaseDate: data.releaseDate,
        category: data.category,
        categoryLink: data.categoryLink,
        rating: data.rating,
        age: data.age
    });

    game.save().then(r => {
        res.status(201).json(r)
    }).catch(e => {
        res.status(404).json({message: 'error posting game'})
    })
});

// fetch games function //
app.post('/api/collection', (req, res) => {
    Game.find().then(r => {
        const arr = [];
        r.map(i => {
            if(i.category === req.body.category){
                arr.push(i)
            }
        });
        res.status(201).json(arr)
    }).catch(e => {
        res.status(404).json({message: "error fetching collection"})
    })
});

// fetch selected game //
app.post('/api/selected', (req, res) => {
    const id = req.body.id;

    Game.findById(id).then(r => {
        res.status(201).json(r)
    }).catch(e => {
        res.status(404).json({message: 'error fetching selected game'})
    })
});

// fetch games //
app.get('/api/games', (req, res) => {
    Game.find().then(r => {
        res.status(201).json(r)
    }).catch(e => {
        res.status(404).json({message: "error fetching games"})
    })
});

// fetch searched game //
app.post('/api/search', (req, res) => {
    const name = req.body.name

    Game.find().then(r => {
        const arr = [];
        r.map(i => {
            const lowerI = i.name.toLowerCase();
            const lowerName = name.toLowerCase();
            if(lowerI === lowerName){
                arr.push(i)
            }
        });
        res.status(201).json(arr);
    }).catch(e => {
        res.status(404).json({message: "error fetching games"})
    })
});