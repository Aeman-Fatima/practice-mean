const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const db = require('./database/models')

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')



const app = express()

db.sequelize.sync();


app.use(bodyParser.json())
app.use(cors())


app.use("/post", postRoutes)
app.use("/user", userRoutes)



module.exports = app