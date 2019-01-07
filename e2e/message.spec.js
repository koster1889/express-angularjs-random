const page = require('./message.page')

describe('Messages', function () {
    beforeEach(function () {
        page.go()
    })
    describe('when posting message', function () {
        it('should be possible to post message', function () {
            page.getMessages().count().then(
                (originalNumberOfMessages) => {
                    page.getMessageInput().clear().sendKeys('Some test message')
                    page.getUsernameInput().clear().sendKeys('Some test username')
                    page.getSubmitButton().click()
                    expect(page.getMessages().count()).toEqual(originalNumberOfMessages + 1)
                }
            )
            
        })
    })
})