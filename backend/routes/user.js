const express = require('express')
require('dotenv').config()
const db = require('../database/models')
const User = db.User

const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const signUpValidation = require('../midlewares/validation')
const { validationResult } = require('express-validator')

router.post('/signup', async (req, res, next) => {

    // const error = validationResult(req)
    // if (!error.isEmpty()) {
    //     return res.status(400).json({ errors: error.array() });
    // }

    const hashedPass = await bcrypt.hash(req.body.password, 8)

    try {
        const userSave = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })

        res.status(200).json({
            message: "User registered",
            response: userSave
        })
    } catch (_err) {
        if (_err.errors[0].type.includes('unique'))
            res.status(500).json({
                message: "Already registered",
                response: _err
            })
        else
            res.status(500).json({
                message: "Can\'t register user",
                response: _err
            })
    }
})

router.post('/login', async (req, res, next) => {

    let loggedInUser
    const secret = process.env.SECRET_KEY
    console.log("YOOOOO", process.env.SECRET_KEY, secret)

    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!!user) loggedInUser = user.dataValues
        else throw "error"
    } catch (_err) {
        return res.status(401).json({
            message: "Email doesn't exist"
        })
    }

    const authorized = await bcrypt.compare(req.body.password, loggedInUser.password)
    if (!authorized) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const token = jwt.sign({ email: loggedInUser.email, userId: loggedInUser.id }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({
            message: "Logged In",
            response: {
                token: token,
                userId: loggedInUser.id,
                expiresIn: 3600
            }
        })

    } catch (_err) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
})

router.get('/me', async (req, res, next) => {

})

module.exports = router