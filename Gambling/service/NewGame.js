var express = require('express');
var game = require('../models/Game.js');
var player = require('../models/Player.js');
var apirouter = express.Router();

apirouter.route('/new').put(function (req, res) {
    var p = new player();
    p.name = req.body.name;
    p.remaining = req.body.remaining;
    p.TBB = req.body.TBB;
    p.FS = req.body.FS;
    p.VPiP = req.body.VPiP;;
    p.Agg = req.body.Agg;
    p.CBet = req.body.CBet;
    p.gameRecord = req.body.gameRecord;

    var g = new game();
    g.gamenum += 1;
    g.pot = req.body.pot;
    g.gDate = req.body.gDate;
    g.preflop = req.body.preflop;
    g.flop = req.body.flop;
    g.turn = req.body.turn;
    g.river = req.body.river;
    g.player = p;
        
    
    g.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: "新增紀錄" });
    });
});

module.exports = apirouter;