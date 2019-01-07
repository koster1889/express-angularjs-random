#features/test.feature
Feature: Running Cucumber with Protractor
    As a user of Random AngularJS app
    I should be able to post a message
    In order to try out cucumber tests

    Scenario: Protractor and Cucumber Test
        Given I go to "http://localhost:3000/"
        When I put "Be Awesome" in the message body field
        And I click the submit button
        Then I should see more than 1 messages
        