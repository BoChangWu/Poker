var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlayerSchema = new Schema({
    name: String,
    remaining: Number,
    //TBB: Number,
    //FS: Number,
    //VPiP: Number,
    //Agg: Number,
    //CBet: Number,
    //BB: Number,
    //gameRecord: Array
}, {
    collection: "Players"
});

module.exports = mongoose.model('Player', PlayerSchema);