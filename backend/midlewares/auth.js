const jwt = require('jsonwebtoken')
require('dotenv').config()

verifyUser = (req, res, next) => {
    try {
        const token = req.headers.autherization.split(' ')[1]
        console.log(process.env.SECRET_KEY)
        const authorized = jwt.verify(token, process.env.SECRET_KEY)
        req.user = authorized.userId
        next()
    } catch (_err) {
        res.status(401).json({
            message: "Unauthorized",
            response: _err
        })
    }
}

module.exports = verifyUser