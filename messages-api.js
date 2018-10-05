const express = require('express')

function messageAPIFactory(data) {

    const messagesRoute = express.Router()
    data.messages = data.messages || []

    messagesRoute.route('/messages')
        .get((req, res) => {
            res.json(data.messages)
        }).post((req, res) => {
            console.log('Message posted'.blue.bold)
            const newMessage = req.body
            newMessage.creationTime = new Date()
            data.messages.unshift(newMessage);
            res.send(data.messages)
        })
    
    return messagesRoute
    
}

module.exports = messageAPIFactory
