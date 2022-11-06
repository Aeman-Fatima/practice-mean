require('dotenv').config()

const db = require('../database/models')
const User = db.User

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passGenerator = require('generate-password')
var nodemailer = require('nodemailer')
const { deleteImage } = require('../midlewares/file-upload')



const signup = async (req, res, next) => {

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
}

const login = async (req, res, next) => {

    let loggedInUser
    const secret = process.env.SECRET_KEY

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
}

const editPass = async (req, res, next) => {
    let loggedInUser

    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!!user) loggedInUser = user.dataValues
        else throw "error"
    } catch (_err) {
        return res.status(401).json({
            message: "User doesn't exist"
        })
    }

    try {
        const authorized = await bcrypt.compare(req.body.oldPass, loggedInUser.password)
        if (!authorized) throw "error"
    } catch (_err) {
        return res.status(401).json({
            message: "Incorrect old password"
        })
    }

    try {
        const hashedPass = await bcrypt.hash(req.body.newPass, 8)
        const updatePass = await User.update({ password: hashedPass }, { where: { id: req.user } })
        res.status(200).json({
            message: "Password updated",
            response: updatePass
        })
    } catch (_err) {
        return res.status(401).json({
            message: "Cannot update password"
        })
    }

}

const forgetPass = async (req, res, next) => {

    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!!user) loggedInUser = user.dataValues
        else throw 'error'
    } catch (_err) {
        return res.status(401).json({
            message: "Incorrect Email"
        })
    }

    try {

        const smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        const newPass = passGenerator.generate({
            length: 6,
            numbers: true
        })

        const hashedPass = await bcrypt.hash(newPass, 8)

        smtpTransport.sendMail({
            from: process.env.EMAIL,
            to: loggedInUser?.email,
            subject: "Password Reset",
            text: `new password: ${newPass}`
        }, (error, response) => {
            if (error) {
                console.log(error);
                return res.status(401).json({
                    message: "Cannot update password"
                })
            } else {
                console.log("mail sent")
            }
        });

        const updatePass = await User.update({ password: hashedPass }, { where: { id: loggedInUser.id } })

        res.status(200).json({
            message: "Password updated",
            response: updatePass
        })
    } catch (_err) {
        console.log(_err)
        return res.status(400).json({
            message: "Cannot update password"
        })
    }
}

const getImage = async (req, res, next) => {
    let loggedInUser

    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!!user) loggedInUser = user.dataValues
        else throw "error"
    } catch (_err) {
        return res.status(401).json({
            message: "User doesn't exist"
        })
    }
    const image = loggedInUser.profile
    res.status(200).json({
        message: "Profile Image",
        response: image
    })
}


const uploadImage = async (req, res, next) => {
    try {
        console.log(req.user)
        const userProfile = await User.update({ profile: req.file.location }, { where: { id: req.user } })
        res.send({
            message: "picture uploaded", response: {
                image: req.file.location
            }
        });
    }
    catch (_err) {
        console.log(_err)
        res.status(500).json({
            message: 'Can\'t Upload Image',
            response: {
                image: _err
            }
        })
    }

}

const deleteImageDB = async (req, res, next) => {
    try {
        const deleteImageBucket = await deleteImage(String(req.user))
    } catch (_err) {
        res.status(500).json({
            message: 'Can\'t delete image',
            response: _err
        })
    }
    try {
        const deleteImageData = await User.update(
            {
                profile: null
            },
            { where: { id: req.user } })
        res.status(200).json({
            message: 'Image deleted',
            response: deleteImageData
        })
    } catch (_err) {
        res.status(500).json({
            message: 'Can\'t delete image',
            response: _err
        })
    }
}

module.exports = {
    signup,
    login,
    editPass,
    forgetPass,
    getImage,
    uploadImage,
    deleteImageDB
}