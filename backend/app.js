const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
// const mongoose = require("mongoose")
const db = require('./database/models')

// const Post = require('./models/post')
// const checkAuth = require("./middleware/check-auth")
// const { createShorthandPropertyAssignment } = require('typescript')

// const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')



const app = express()


// mongoose.connect("mongodb+srv://aemanfatima818:oLnfZqe4Fcf8gONI@cluster0.0oibmq6.mongodb.net/node-angular?retryWrites=true&w=majority")
//     .then(() => {
//         console.log("Connected")
//     }).catch(err => console.log(err))

db.sequelize.sync();


app.use(bodyParser.json())
app.use(cors())


app.use("/post", postRoutes)
app.use("/user", userRoutes)



module.exports = app