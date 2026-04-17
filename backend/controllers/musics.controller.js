const musicModel = require('../models/music.models.js')
const userModel = require('../models/user.models.js')
const jwt = require("jsonwebtoken")
const albumModel = require('../models/album.models.js');
const imageKit = require("../services/imagekit.service.js");




async function uploadMusic(req, res) {
  try {
    const { title, desc } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        msg: "Authentication required"
      });
    }

    const uploadResponse = await imageKit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/artistMusics"
    })

    //req.user.id is the id of the user who is logged in and creating the music
    const createMusic = await musicModel.create({
      title: title,
      desc: desc,
      song: uploadResponse.url,
      artist: req.user.id
    })

    res.json({
      msg: "successUpload!",
      music: createMusic
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

async function allMusics(req, res) {
  try {
    const musics = await musicModel
      .find()
      .populate("artist", "username profilePic")

    res.status(200).json({
      user : req.user.id,
      message: "Musics fetched successfully",
      musics: musics,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}

async function createAlbum(req, res) {

  const { title, desc, musicIds } = req.body;



  //if title or musicIds is not provided return error message 
  if (!title || !musicIds || musicIds.length === 0) {
    return res.status(400).json({
      message: "Title and selected musics required"
    });
  }

  try {
    //musicIDs is an array of music ids that we want to add to the album 
    const album = await albumModel.create({
      title,
      desc,
      musics: musicIds,
      user: req.user.id
    });

    res.status(201).json({
      message: "Album created",
      album
    });

  } catch (error) {

    //duplicate title error 
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Album title already exists"
      });
    }

    res.status(500).json({
      message: error.message
    });
  }
}

async function myMusics(req, res) {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWSKEY);

    if (decoded.artist === "user") {
      return res.status(200).json({
        msg: "you do not have access"
      }
      )
    }
    const musics = await musicModel
      .find({ artist: decoded.id })
      .populate("artist");

    return res.status(200).json({
      message: "Musics fetched successfully",
      musics

    });




  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
}

async function myAlbums(req, res) {

  const albums = await albumModel.find({
    user: req.user.id
  }).populate("musics", "song")

  res.status(200).json({
    albums,


  })




}
async function deleteAlbum(req, res) {
  const { albumId } = req.params;

  try {
    await albumModel.findByIdAndDelete(albumId);

    return res.status(200).json({
      message: "Album deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}


async function likeCount(req, res) {
  try {
    const userId = req.userId;
    const musicId = req.params.musicId;

    const music = await musicModel.findById(musicId);

    if (!music) {
      return res.status(404).json({ message: "Music not found" });
    }

    const alreadyLiked = music.likedBy.includes(userId);

    if (alreadyLiked) {
      // Unlike
      await musicModel.updateOne(
        { _id: musicId },
        { $pull: { likedBy: userId } }
      );

      return res.json({
        liked: false,
        totalLikes: music.likedBy.length - 1,
        user : userId

      });

    } else {
      // Like
      await musicModel.updateOne(
        { _id: musicId },
        { $push: { likedBy: userId } }
      );

      return res.json({
        liked: true,
        totalLikes: music.likedBy.length + 1,
        user : userId
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { uploadMusic, allMusics, createAlbum, myMusics, myAlbums, deleteAlbum, likeCount }