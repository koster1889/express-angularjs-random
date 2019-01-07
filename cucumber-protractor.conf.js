exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    browser: 'chrome',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        'e2e/features/*.feature'
    ],
    baseURL: 'http://localhost:3000/',
    cucumberOpts: {
        require: './e2e/features/steps/messages.step.js',
        tags: false,
       // format: 'pretty',
        profile: false,
        'no-source': true
      }
}
