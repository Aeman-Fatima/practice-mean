const http = require('http')
const app = require('./backend/app')

// const db = require("./backend/database/models")

const port = process.env.PORT || 3000
app.set('port', port)

//jab b koi req hut kre gi ye call hoga
const server = http.createServer(app)

server.listen(port)