module.exports = {
    go: function () {
        browser.get('http://localhost:3000/')
    },
    getMessageInput: () => element(by.id('message-body-input')),
    getUsernameInput: () => element(by.id('message-username-input')),
    getSubmitButton: () => element(by.id('message-submit')),
    getMessages: () => element.all(by.css('#messages-container .message'))
 }