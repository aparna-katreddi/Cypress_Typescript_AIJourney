/// <reference types="cypress" />
import { GeneralInfoData } from './types';
  
  
  declare global {
      namespace Cypress {
        interface Chainable { 
            verifyTitleOnCompliancePage():Chainable
            completeComplianceMeasures(data: GeneralInfoData):Chainable
            validateComplianceWarnings(data: GeneralInfoData):Chainable
            navigateToSummaryPage():Chainable
              }
        }
      }

const COMPLIANCE_PAGE = '#compliance';
const RISK_ASSESMENT_SELECTOR ='#riskAssessment';
const AUDIT_SELECTOR ='#audit';
const COMPLIANCE_WARNING_SELECTOR = '#compliance-warning';



export function verifyTitleOnCompliancePage():Cypress.Chainable{
  cy.get(COMPLIANCE_PAGE).contains('Compliance Measures');
  return cy;
}


export function completeComplianceMeasures(data:GeneralInfoData):Cypress.Chainable {
    cy.get(RISK_ASSESMENT_SELECTOR).select(data.riskAssessment || '');
    cy.get(AUDIT_SELECTOR).select(data.audit || '');
    return cy;
  }

  export function validateComplianceWarnings(data:GeneralInfoData):Cypress.Chainable {
    if (data.riskLevel === 'High' && (data.riskAssessment !== 'Yes' || data.audit !== 'Yes')) {
      cy.get(COMPLIANCE_WARNING_SELECTOR).should('contain', 'High-risk level requires formal risk assessment and audit.');
    }
    return cy;
  }

  export function navigateToSummaryPage():Cypress.Chainable
  {
    cy.get(COMPLIANCE_PAGE)
      .find('button')
      .contains('Submit').click();
      return cy;
  }


Cypress.Commands.add('verifyTitleOnCompliancePage',verifyTitleOnCompliancePage);  
Cypress.Commands.add('completeComplianceMeasures',completeComplianceMeasures);
Cypress.Commands.add('validateComplianceWarnings',validateComplianceWarnings);
Cypress.Commands.add('navigateToSummaryPage',navigateToSummaryPage);