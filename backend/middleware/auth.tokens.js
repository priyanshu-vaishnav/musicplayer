const jwt = require("jsonwebtoken")


async function authArtist(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                msg: "No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWSKEY);

        if (decoded.role !== "artist") {
            return res.status(401).json({
                msg: "you are not an artist"
            })
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token: " + error.message
        })
    }
}



async function authUser(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                msg: "No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWSKEY);

       

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: "Invalid token: " + error.message
        })
    }
}

module.exports = {authArtist,authUser}