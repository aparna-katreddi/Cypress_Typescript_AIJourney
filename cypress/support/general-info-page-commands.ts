/// <reference types="cypress" />
import { GeneralInfoData,GeneralInfoMissingData } from './types';

declare global {
  namespace Cypress {
     interface Chainable {
      simpleCommand(testData: string): Chainable
      fillGeneralInfo(data: GeneralInfoData): Chainable
      validateGeneralInfoWarnings(): Chainable
      navigateToAIRiskManagementPage(): Chainable
      fillGeneralInfoWithMissingData(data: GeneralInfoMissingData): Chainable
    }
  }
}

const GENERAL_INFO_PAGE = '#general-info'
const DEPLOYMENT_NAME_SELECTOR = '#deploymentName';
const ORGANIZATION_NAME_SELECTOR = '#organizationName';
const EMAIL_ADDRESS_SELECTOR = '#emailAddress';
const DEPLOYMENT_REGION_SELECTOR = '#deploymentRegion';
const GENERAL_INFO_WARNING = '#general-info-warning';


export function simpleCommand(testData: string): Cypress.Chainable {
  return cy.wrap(testData);
}

 export function fillGeneralInfo(data:GeneralInfoData):Cypress.Chainable
{      
      cy.get(GENERAL_INFO_PAGE).then(($item) => {
      cy.wrap($item).should('contain','AI Deployment Name: ')
                    .and('contain','Organization Name: ')
                    .and('contain','Email Address: ')
                    .and('contain','Deployment Region:');   
      });
       cy.get(DEPLOYMENT_NAME_SELECTOR).type(data.name || '');
       cy.get(ORGANIZATION_NAME_SELECTOR).type(data.organization|| '');
       cy.get(EMAIL_ADDRESS_SELECTOR).type(data.email|| '');
       cy.get(DEPLOYMENT_REGION_SELECTOR).select(data.region|| '');  
       return cy;
     
 }

 export function fillGeneralInfoWithMissingData(data:GeneralInfoMissingData):Cypress.Chainable
{      
       cy.get(DEPLOYMENT_NAME_SELECTOR).invoke('val',data.name || '');
       cy.get(ORGANIZATION_NAME_SELECTOR).invoke('val',data.organization|| '');
       cy.get(EMAIL_ADDRESS_SELECTOR).invoke('val',data.email|| '');
       cy.get(DEPLOYMENT_REGION_SELECTOR).select(data.region|| ''); 
       return cy; 
 }

 export function validateGeneralInfoWarnings():Cypress.Chainable
 {
      cy.navigateToAIRiskManagementPage()
        .get(GENERAL_INFO_PAGE)
        .find(GENERAL_INFO_WARNING)
        .should('exist')
        .and('contain', 'Please fill out all fields and provide a valid email.');
        return cy;
 }

 export function navigateToAIRiskManagementPage():Cypress.Chainable
  {
    cy.get(GENERAL_INFO_PAGE).contains('Next').click(); 
    return cy;
 }


// Registering the commands 
Cypress.Commands.add('simpleCommand', simpleCommand);
Cypress.Commands.add('fillGeneralInfo', fillGeneralInfo);
Cypress.Commands.add('validateGeneralInfoWarnings', validateGeneralInfoWarnings);
Cypress.Commands.add('navigateToAIRiskManagementPage', navigateToAIRiskManagementPage);
Cypress.Commands.add('fillGeneralInfoWithMissingData', fillGeneralInfoWithMissingData);



  



  
 