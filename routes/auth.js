require('dotenv/config')
const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if(!token){
        console.log("A token is required for authentication")
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY)
        req.user = decoded
    } catch(err){
        console.log(err)
    }
    return next()
}

module.exports = verifyToken