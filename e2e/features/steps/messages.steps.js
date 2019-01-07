
var chai = require('chai');
var expect = chai.expect;
const page = require('./../../message.page')
const {Given, When, Then} = require('cucumber')


console.log('Loading step definition...')

Given('I go to {string}', function (url) {
    browser.get(url)
  });

When('I put {string} in the message body field', function (string) {
  return page.getMessageInput().sendKeys(string)
});

When('I click the submit button', function () {
  return page.getSubmitButton().click()
});

Then('I should see more than {int} messages', function (nrOfMessaegs) {
  return page.getMessages().count().then((nr)=> {
    expect(nr).to.be.at.least(nrOfMessaegs);
  })
});
