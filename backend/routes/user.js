const express = require('express')
require('dotenv').config()


const router = express.Router()

const { signup, login } = require('../controllers/user')

router.post('/signup', signup)

router.post('/login', login)

module.exports = router