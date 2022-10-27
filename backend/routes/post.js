const express = require('express')
const { createPost, getAllPosts, deletePost, editPost, getPost } = require('../controllers/post')
const verifyUser = require('../midlewares/auth')

const router = express.Router()


router.post('', verifyUser, createPost)

router.get('', getAllPosts)

router.delete('/delete/:id', verifyUser, deletePost)

router.put('/:id', verifyUser, editPost)

router.get('/:id', getPost)

module.exports = router