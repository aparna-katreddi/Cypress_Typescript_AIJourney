/// <reference types="cypress" />
import { GeneralInfoData } from './types';
  
  
  declare global {
      namespace Cypress {
        interface Chainable { 
              verifyTitleOnDataSecurityPage():Chainable
              fillDataSecurityDetails(data: GeneralInfoData):Chainable
              validateDataSecurityWarnings(data: GeneralInfoData):Chainable
              navigateToCompliancePage():Chainable
              }
        }
      }
  const DATA_SECURITY_PAGE = '#data-security';
  const SECURITY_MEASURES_SELECTOR = '#securityMeasures';
  const ENCRYTION_SELECTOR = '#encryption';
  const DATA_RESIDENCY_COMPLIANCE_SELECTOR ='#dataResidencyCompliance';
  const DATA_SECURITY_WARNING_SELECTOR='#data-security-warning';
  
  
  export function verifyTitleOnDataSecurityPage(): Cypress.Chainable
  {
    cy.get(DATA_SECURITY_PAGE).contains('Data Security');
    return cy;
  }
  
  export function fillDataSecurityDetails(data:GeneralInfoData): Cypress.Chainable {
      cy.get(SECURITY_MEASURES_SELECTOR).invoke('val',data.securityMeasures || '');
      cy.get(ENCRYTION_SELECTOR).select(data.encryption);
      if (data.region === 'EU') {
        cy.get(DATA_RESIDENCY_COMPLIANCE_SELECTOR).select(data.dataResidencyCompliance);
      }
      return cy;
    }
  
  export function validateDataSecurityWarnings(data:GeneralInfoData): Cypress.Chainable {
      if (data.region === 'EU' && data.dataResidencyCompliance !== 'Yes') {
        cy.get(DATA_SECURITY_WARNING_SELECTOR).should('contain', 'Data Residency Compliance is required for EU region.');
      }
      if (!data.securityMeasures) {
        cy.get(DATA_SECURITY_WARNING_SELECTOR).should('contain', 'Security Measures cannot be empty.');
      }
     if (data.sensitiveData==='Yes' && data.encryption !== 'Yes') {
        cy.get(DATA_SECURITY_WARNING_SELECTOR).should('contain', 'Encryption is recommended for sensitive data.');
      }
      return cy;
  }
   
   export function navigateToCompliancePage():Cypress.Chainable {
    cy.get(DATA_SECURITY_PAGE)
      .find('button')
      .contains('Next').click();
      return cy;
   }   
  
  
  Cypress.Commands.add('verifyTitleOnDataSecurityPage',verifyTitleOnDataSecurityPage);
  Cypress.Commands.add('fillDataSecurityDetails',fillDataSecurityDetails);
  Cypress.Commands.add('validateDataSecurityWarnings',validateDataSecurityWarnings);
  Cypress.Commands.add('navigateToCompliancePage',navigateToCompliancePage);
  
  
    