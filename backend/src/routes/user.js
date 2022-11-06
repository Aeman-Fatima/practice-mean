const express = require('express')
require('dotenv').config()
const verifyUser = require('../midlewares/auth')


const router = express.Router()

const { signup, login, editPass, forgetPass, getImage, uploadImage, deleteImageDB } = require('../controllers/user')
const { upload, deleteImage } = require('../midlewares/file-upload')

router.post('/signup', signup)

router.post('/login', login)

router.post('/editPass', verifyUser, editPass)

router.get('/image', verifyUser, getImage)

router.post('/forgetPass', forgetPass)

router.post('/upload', verifyUser, upload.single('image'), uploadImage)

router.delete('/delete', verifyUser, deleteImageDB)

module.exports = router