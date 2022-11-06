const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const db = require('./src/database/models')

const postRoutes = require('./src/routes/post')
const userRoutes = require('./src/routes/user')



const app = express()

db.sequelize.sync();


app.use(bodyParser.json())
app.use(cors())


app.use("/post", postRoutes)
app.use("/user", userRoutes)



module.exports = app