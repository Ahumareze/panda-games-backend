//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//models
const Collection = require('./models/collection');
const Game = require('./models/game');

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
        res.status(201).json({message: "Posted successfully"})
    })
    .catch(e => {
    res.status(404).json({message: "Error sending data"})
    })
})