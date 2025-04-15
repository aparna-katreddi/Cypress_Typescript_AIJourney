// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import './commands';
import 'cypress-mochawesome-reporter/register';
import './general-info-page-commands';
import './ai-risk-mngmt-page-commands';
import './data-security-page-commands';
import './compliance-measure-page-commands';
import './summary-page-commands';


// Example configuration export for e2e
export const e2e = {
    screenshotOnRunFailure: true,
    // ...other options
};