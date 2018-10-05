const express = require('express')
require('colors')

function apiFactory(data) {

    const api = express.Router()

    const messagesAPI = require('./messages-api.js')(data)

    api.use(function (req, res, next) {
        console.log(req.url.gray)
        next()
    })

    api.use('/api', messagesAPI)

    return api

}

module.exports = apiFactory