const path = require('path');
const projectName = require('./package').name;


module.exports = function(config) {

  const customLaunchers = {
    // Browsers to run on BrowserStack.
    BS_Chrome: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'chrome',
      browser_version: 'latest'
    },
    BS_Firefox: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'firefox',
      browser_version: 'latest'
    },
    BS_Safari: {
      base: 'BrowserStack',
      os: 'OS X',
      os_version: 'El Capitan',
      browser: 'safari',
      browser_version: 'latest'
    },
    BS_MobileSafari9: {
      base: 'BrowserStack',
      os: 'ios',
      os_version: '9.1',
      browser: 'iphone',
      real_mobile: false
    },
    BS_InternetExplorer10: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '8',
      browser: 'ie',
      browser_version: '10.0'
    },
    BS_InternetExplorer11: {
      base: 'BrowserStack',
      os: 'Windows',
      os_version: '10',
      browser: 'ie',
      browser_version: '11.0'
    },

    // The ancient Travis Chrome that most projects use in CI.
    ChromeCi: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,

    customLaunchers: customLaunchers,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine-jquery', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'spec/javascripts/index.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'node_modules/d3-charts-dto/**/*.js': ['browserify'],
      'spec/javascripts/index.js': ['browserify']
    },

    browserify: {
      debug: true,
      paths: [
        path.join(__dirname, 'lib/assets/src/scripts')  // make "Helpers/" paths accessible
      ],
      transform: [
        ['babelify'],
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['nyan'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });


  if (process.env.USE_CLOUD) {
    config.browserStack = {};
    config.browserStack.username = process.env.BROWSER_STACK_USERNAME;
    config.browserStack.accessKey = process.env.BROWSER_STACK_ACCESS_KEY;
    config.browserStack.project = projectName;

    config.browsers = Object.keys(customLaunchers);
    config.concurrency = 2;

    config.browserDisconnectTimeout = 10000;
    config.browserDisconnectTolerance = 3;
  }

};
