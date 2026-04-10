const mongoose = require('mongoose')

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    desc: {
        type: String,  

    },
    //when want the music of the album to be displayed in the frontend we need to add the musics array 
    musics:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "music"
        }
    ],
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    }
})

const albumModel = mongoose.model('album', albumSchema);
module.exports = albumModel;