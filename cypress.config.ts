import { defineConfig } from "cypress";
import mochawesome from 'cypress-mochawesome-reporter/plugin';




export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on);
      // If you use other node events, add them here
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
   // baseUrl: '', // Optional: define if needed
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'AI_Journey_Reports',
    reportFilename: 'AI_Journey_Test_Results_Report',
    embeddedScreenshots: true,
    reportDir: 'cypress/reports/AI_Journey_Reports',
    overwrite: false,
    inlineAssets: true,
    saveAllAttempts: false,
    timestamp: 'yyyy-mm-dd_HH-MM-ss',
    pending: false,
  },
});


