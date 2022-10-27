const express = require('express')
const verifyUser = require('../midlewares/auth')

// const { Router } = require('@angular/router')
// const Post = require('../database/models')
const db = require('../database/models')
const Post = db.Post

const router = express.Router()


router.post('', verifyUser, async (req, res, next) => {

    try {
        const postSave = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.user
        })

        res.status(200).json({
            message: 'Post Created',
            response: postSave
        })
    }

    catch (_err) {
        res.status(500).json({
            message: 'Cannot create post',
            response: _err
        })
    }
})

router.get('', async (req, res, next) => {
    try {
        const postGet = await Post.findAll()
        res.status(200).json({
            message: 'Posts recieved',
            response: postGet
        })
    }
    catch (_err) {
        res.status(500).json({
            message: 'Error getting in posts',
            response: _err
        })
    }
})

router.delete('/delete/:id', verifyUser, async (req, res, next) => {
    try {
        const postDelete = await Post.deleteOne({ _id: req.params.id, creater: req.user })
        res.status(200).json({
            message: 'post deleted',
            response: postDelete
        })
    } catch (_err) {
        res.status(500).json({
            message: 'Can\'t delete post',
            response: _err
        })
    }
})

router.put('/:id', verifyUser, async (req, res, next) => {
    try {
        const postEditData = {
            title: req.body.title,
            content: req.body.content
        }
        const postEdit = await Post.updateOne({ _id: req.params.id, creater: req.user }, postEditData)
        // const editedPost = await Post.findOne({_id: req.params.id})
        res.status(200).json({
            message: 'post updated',
            response: postEdit
        })
    } catch (_err) {
        res.status(500).json({
            message: 'Can\'t update post',
            response: _err
        })
        console.log(_err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const postGetOne = await Post.findOne({ _id: req.params.id })
        res.status(200).json({
            message: 'Post recieved',
            response: postGetOne
        })
    } catch (_err) {
        res.status(500).json({
            message: 'Can\'t update',
            response: _err
        })
    }
})

module.exports = router