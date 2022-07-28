//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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