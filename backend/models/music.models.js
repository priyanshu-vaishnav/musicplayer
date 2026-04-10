const mongoose = require("mongoose");


const musicSchema = mongoose.Schema({
    song: {
        type: String,
        required: true,
        unique: true,

    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,

    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]

})

const musicModel = mongoose.model('music', musicSchema);
module.exports = musicModel
