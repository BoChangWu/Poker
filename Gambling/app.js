'use strict';
var http = require('http');
var express = require('express');
var port = process.env.PORT || 3300;

var bodyParser = require('body-parser');
var playerService = require('./service/PlayerService.js');
var gameService = require('./service/GameService.js');
var addGameService = require('./service/NewGame.js');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/api', playerService);
app.use('/record', gameService);
app.use('/add', addGameService);
//app.get('/api', function (req, res) {
//    res.render("service/PlayerService");
//});
mongoose.connect('mongodb://localhost:27017/Gambling'); 


app.listen(port);
console.log(`server listening on : ${port}`)
