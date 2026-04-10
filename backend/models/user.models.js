const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    profilePic: {
        type: String,
        required:true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        

    },
    email: {
        type: String,
        required: true,
        trim: true,
        
    },
    password: {
        type: String,
        required: true,

    },
    role: {
        type: String,
        enum: ["user", "artist"],
        default: "user"
    }


}, {
    timestamps: true
})


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;