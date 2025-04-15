/// <reference types="cypress" />


declare global {
  namespace Cypress {
     interface Chainable {
        verifyTitleOnAIRiskMngmtPage(): Chainable
        selectSensitiveData(sensitiveData: string): Chainable
        selectRiskLevel(riskLevel:string): Chainable
        validateNavigationWarning(): Chainable
        navigateToNextSection(): Chainable
    }
  }
}

export const AI_RISK_SECTION_SELECTOR = '#ai-risk.section.active'
export const SENSITIVE_DATA_SELECTOR = '#sensitiveData';
export const RISK_LEVEL_SELECTOR = '#riskLevel';
export const AI_RISK_WARNING_SELECTOR = '#ai-risk-warning';


export function verifyTitleOnAIRiskMngmtPage():Cypress.Chainable
{
  cy.get(AI_RISK_SECTION_SELECTOR).contains('AI Risk Management');
  return cy;
}

export function selectSensitiveData(sensitiveData:string):Cypress.Chainable {
    cy.get(AI_RISK_SECTION_SELECTOR).find('label').contains(`Does your AI system handle sensitive data? `);
    cy.get(AI_RISK_SECTION_SELECTOR).find(SENSITIVE_DATA_SELECTOR).select(sensitiveData);
    return cy;
  }

export function selectRiskLevel(riskLevel:string):Cypress.Chainable {
  cy.get(AI_RISK_SECTION_SELECTOR).find('label').contains('Risk Level:');
    cy.get(AI_RISK_SECTION_SELECTOR).find(RISK_LEVEL_SELECTOR).select(riskLevel);
    return cy;
  }

  export function validateNavigationWarning():Cypress.Chainable {
     cy.get(AI_RISK_WARNING_SELECTOR)
       .should('contain', 'Please select both Sensitive Data and Risk Level.');
       return cy;
  }


  export function navigateToNextSection():Cypress.Chainable {
    cy.get(AI_RISK_SECTION_SELECTOR).find('button').contains('Next').click();
    return cy;
  }


  Cypress.Commands.add('verifyTitleOnAIRiskMngmtPage',verifyTitleOnAIRiskMngmtPage);
  Cypress.Commands.add('selectSensitiveData',selectSensitiveData);
  Cypress.Commands.add('selectRiskLevel',selectRiskLevel);
  Cypress.Commands.add('navigateToNextSection',navigateToNextSection);
  Cypress.Commands.add('validateNavigationWarning',validateNavigationWarning);
