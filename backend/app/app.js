const express= require('express');
const cors = require('cors')
const cookieparser = require("cookie-parser")
const authRoutes = require('../routes/auth.routes.js')
const musicRoutes = require('../routes/music.routes.js')
const app = express();
app.use(cookieparser())
app.use(express.json());
const allowedOrigins = [
  'https://musicplayer-chi-woad.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use('/api/auth',authRoutes)
app.use('/api/music',musicRoutes)

module.exports = app
