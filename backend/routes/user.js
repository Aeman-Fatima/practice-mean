const express = require('express')
require('dotenv').config()
const verifyUser = require('../midlewares/auth')


const router = express.Router()

const { signup, login, editPass } = require('../controllers/user')

router.post('/signup', signup)

router.post('/login', login)

router.post('/editPass', verifyUser, editPass)


module.exports = router