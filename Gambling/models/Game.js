var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
    gameId: Number,
    pot: Number,
    gDate: Date,
    preflop: Number,
    flop: Number,
    turn: Number,
    river: Number,
    players: Array
}, {
    collection: "GameRecord"
});


module.exports = mongoose.model('Game', GameSchema);