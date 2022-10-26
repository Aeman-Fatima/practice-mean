const jwt = require('jsonwebtoken')

verifyUser = (req, res, next) => {
    try {
        const token = req.headers.autherization.split(' ')[1]

        const authorized = jwt.verify(token, 'aorj[c0r,j[0pajrc0par-3[')
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