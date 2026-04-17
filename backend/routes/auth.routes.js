const express = require('express');
const authController = require('../controllers/auth.controller.js')
const authMiddleware = require('../middleware/auth.tokens.js');
const authValidation = require("../middleware/auth.validation.js")
const multer = require('multer');
const route = express.Router();
const upload = multer({storage: multer.memoryStorage()});

route.post('/register',upload.single("profilePic"),authValidation.registerRules,authController.register)
route.post('/login',authValidation.loginRules,authController.login)
route.post('/logout',authController.logout)
route.patch('/change-role',authMiddleware.authUser,authController.changeRole)
route.get('/mydetails',authMiddleware.authUser,authController.myDetails)


module.exports = route
