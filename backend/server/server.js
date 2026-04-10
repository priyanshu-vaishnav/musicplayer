const app = require('../app/app.js')
const connectDB=require("../db/db.js")
const dotenv = require('dotenv')
dotenv.config();
connectDB();

app.listen(process.env.PORT,()=>{
    console.log("app is running on port ", process.env.PORT);
})
