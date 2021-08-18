var express = require('express');
var game = require('../models/Game.js');
var player = require('../models/Player.js');
var apirouter = express.Router();

apirouter.route("/games").get(function (req, res) {
    game.find(function (err, games) {
        if (err) {
            res.send(err);
        }
            if (err) {
                res.send(err);
            }
            res.json(games)
        });
    });

apirouter.route('/games/:gamenum').get(function (req, res) {
    game.find({ gamenum: req.params.gamenum }, function (err,game) {
        if (err) {
            res.send(err);
        }
        res.json(game);
    });
});





apirouter.route('/players/:gamenum').delete(function (req, res) {
    game.remove({ gamenum: req.params.gamenum },
        function (err) {
            if (err) {
                res.send(err)
            }
            res.json({ message: "deleted" });
        });
});

module.exports = apirouter;