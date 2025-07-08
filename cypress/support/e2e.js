// cypress/support/e2e.js
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();

require('cypress-wait-until');

require('./pages.js');
