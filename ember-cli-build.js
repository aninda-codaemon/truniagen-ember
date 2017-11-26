/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    minifyCSS: {
      options: { processImport: true }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  app.import('vendor/css/bootstrap.min.css');
  app.import('vendor/css/font-awesome.min.css');
  app.import('vendor/css/_typography.css');
  app.import('vendor/css/_border.css');
  app.import('vendor/css/_nav.css');
  app.import('vendor/css/_forms.css');
  app.import('vendor/css/_containers.css');
  app.import('vendor/css/style_about.css');
  app.import('vendor/css/_purchase.css');

  app.import('vendor/js/jquery-1.11.1.min.js');
  app.import('vendor/js/bootstrap.min.js');
  app.import('vendor/js/jquery.form.js');
  app.import('vendor/js/jquery.validate.min.js');
  app.import('vendor/js/jquery.validationEngine.js');
  app.import('vendor/js/jquery.validationEngine-en.js');
  app.import('vendor/js/checkout-js.js');
  app.import('vendor/js/common.js');

  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
