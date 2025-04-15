/// <reference types="cypress" />
import { GeneralInfoData } from './types';

declare global {
    namespace Cypress {
      interface Chainable {
            verifySummaryPageTitle:Chainable
            navigateToSummaryPage(): Chainable
            validateSummary(data: GeneralInfoData): Chainable
            submitForm(): Chainable
            }
      }
    }

const SUMMARY_PAGE ='#summary'
const SUMMARY_CONTENT = '#summaryContent'

export function verifySummaryPageTitle():Cypress.Chainable {
    cy.get(SUMMARY_PAGE).contains('Summary');
    return cy;
}
export function validateSummary(data:GeneralInfoData):Cypress.Chainable {
    cy.get(SUMMARY_CONTENT).then(($content) =>{
      cy.wrap($content)
        .should('contain', `AI Deployment Name: ${data.name}`)
        .and('contain', `Organization Name: ${data.organization}`)
        .and('contain', `Email Address: ${data.email}`)
        .and('contain', `Region: ${data.region}`)
        .and('contain', `Sensitive Data: ${data.sensitiveData}`)
        .and('contain', `Risk Level: ${data.riskLevel}`)
        .and('contain', `Security Measures: ${data.securityMeasures}`)
        .and('contain', `Encryption: ${data.encryption}`)
        .and('contain', `Data Residency Compliance: ${data.dataResidencyCompliance}`)
        .and('contain', `Risk Assessment: ${data.riskAssessment}`)
        .and('contain', `Compliance Audit: ${data.audit}`);
    })
    return cy;
  }

  export function submitForm():Cypress.Chainable {
    cy.contains('Finish').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal("Form submitted successfully.");
    });
    return cy;
  }


  Cypress.Commands.add('verifySummaryPageTitle',verifySummaryPageTitle)
  Cypress.Commands.add('validateSummary',validateSummary);
  Cypress.Commands.add('submitForm',submitForm);

  