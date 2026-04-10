const userModel = require('../models/user.models.js')
const musicModel = require('../models/music.models.js')
const jwt = require('jsonwebtoken');
const imagekit = require("../services/imagekit.service.js");


async function register(req, res) {

    const { username, email, password, role } = req.body


    const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/images"
    })

    const user = await userModel.create({
        profilePic: uploadResponse.url,
        username,
        email,
        password,
        role
    })
    const token = jwt.sign({
        id: user._id, role: user.role
    }, process.env.JWSKEY, { expiresIn: '24h' })
    res.cookie("token", token)
    res.status(200).json({
        user: user
    })



}

async function login(req, res) {

    const { username, password } = req.body

    if(!username || !password){
        return res.status(402).json({
            msg:"Please enter username or password"
        })
    }

    const user = await userModel.findOne({ username })
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({
        id: user._id, role: user.role
    }, process.env.JWSKEY)
    res.cookie("token", token)

    res.status(200).json({
        user: user,
        msg: "login success"
    })

}

async function changeRole(req, res) {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWSKEY);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const newRole = user.role === "artist" ? "user" : "artist";

       const token =  jwt.sign({ role: newRole }, process.env.JWSKEY)

       res.cookie("token",token)

        const updatedUser = await userModel.findByIdAndUpdate(
            decoded.id,
            { role: newRole },
            { returnDocument: "after" }
        );

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        res.status(401).json({ msg: "Unauthorized" });
    }
}

async function logout(req, res) {

    try {

        res.clearCookie("token");

        res.status(200).json({
            msg: "Logout successful"

        })
    } catch (err) {
        res.status(400).json({
            msg: "Logout failed"
        })
    }



}

async function myDetails(req, res) {

    const decoded = jwt.verify(req.cookies.token, process.env.JWSKEY);

    const user = await userModel.findById(decoded.id);


    
    if (user.role === "user") {
        return res.status(200).json({
            profilePic:user.profilePic,
            username: user.username,
            email: user.email,
            role: user.role,
            id: user._id,

        });
    }

    const music = await musicModel.find({
        artist: user._id
    })


    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
            profilePic:user.profilePic,
        username: user.username,
            email: user.email,
            role: user.role,
            id: user._id,
            musics:music.length
    })


}

module.exports = { register, login, changeRole, logout, myDetails }
