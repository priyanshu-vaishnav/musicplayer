const express= require('express');
const cors = require('cors')
const cookieparser = require("cookie-parser")
const authRoutes = require('../routes/auth.routes.js')
const musicRoutes = require('../routes/music.routes.js')
const app = express();
app.use(cookieparser())
app.use(express.json());
app.use(cors({
  origin: "https://musicplayer-9n08.onrender.com",
  credentials: true
}))

app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)

module.exports = app
