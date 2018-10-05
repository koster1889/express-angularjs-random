const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const api = require('./api.js')({})

app.use(bodyParser.json({limit: '5mb'}))
app.disable('etag')
app.use(bodyParser.urlencoded({extended: true}))

app.use(api)
app.use(express.static('static'))

const server = app.listen(3000, () => console.log('Example app listening on port 3000!'))
server.timeout = 1000
