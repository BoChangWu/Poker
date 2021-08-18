var express = require('express');
var player = require('../models/Player.js');
var apirouter = express.Router();

apirouter.route("/players").get(function (req, res) {
    player.find(function (err, players) {
        if (err) {
            res.send(err);
        }
        res.json(players);
    });
});

apirouter.route('/players/:name').get(function (req, res) {
    player.find({ name: req.params.name }, function (err, player) {
        if (err) {
            res.send(err);
        }
        res.json(player);
    });
});

apirouter.route('/players').post(function (req, res) {
    var p = new player();
    p.name = req.body.name;
    p.remaining = req.body.remaining;
    //p.TBB = req.body.TBB;
    //p.FS = req.body.FS;
    //p.VPiP = req.body.VPiP;
    //p.Agg = req.body.Agg;
    //p.CBet = req.body.CBet;
    //p.BB = req.body.BB;
    //p.gameRecord = req.body.gameRecord;

    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message:"新增玩家"});
    });
});

apirouter.route('/players').put(function (req, res) {
    player.updateOne({ name: req.body.name },
        {
            name: req.body.name,
            remaining: req.body.remaining,
            //TBB: req.body.TBB,
            //FS: req.body.FS,
            //VPiP: req.body.VPiP,
            //Agg: req.body.Agg,
            //CBet: req.body.CBet,
            //BB: req.body.BB,
            //gameRecord: req.body.gameRecord
        },
        function (err, result) {
            if (err) {
                res.send(err);
            }
            res.json(result);
        });
});

apirouter.route('/players/:name').delete(function (req, res) {
    player.remove({ name: req.params.name },
        function (err) {
            if (err) {
                res.send(err)
            }
            res.json({ message: "deleted" });
        });
});

module.exports = apirouter;