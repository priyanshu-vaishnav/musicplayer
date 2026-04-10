const express = require('express')
const musicControllers = require("../controllers/musics.controller.js")
const authTokens = require('../middleware/auth.tokens.js')
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const route = express.Router();


route.post('/upload',authTokens.authArtist,upload.single("music"),musicControllers.uploadMusic)
route.get('/allmusics',authTokens.authUser,musicControllers.allMusics)
route.post('/like/:musicId',authTokens.authUser,musicControllers.likeCount)
route.post('/createalbum',authTokens.authUser,musicControllers.createAlbum)
route.get('/mymusics',authTokens.authArtist,musicControllers.myMusics)
route.get('/myalbums',authTokens.authUser,musicControllers.myAlbums)
route.delete('/deletealbum/:albumId',musicControllers.deleteAlbum)

module.exports = route