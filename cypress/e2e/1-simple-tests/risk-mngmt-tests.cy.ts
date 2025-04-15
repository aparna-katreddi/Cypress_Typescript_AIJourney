
import {allRegionValidTestData} from '../../fixtures/all-region-valid-testData.json';
import {generalInfoInvalidTestData} from '../../fixtures/general-info-invalid-testData.json';
import {aiRiskMngmtInvalidTestData} from '../../fixtures/ai-risk-mngmt-invalid-testData.json';
import {dataSecurityInvalidTestData} from '../../fixtures/data-security-page-invalid-testData.json';
import {complianceMeasuresInvalidTestData} from '../../fixtures/compliance-measures-page-invalid-testData.json';


 describe('AI Security Questionnaire - Complex Business Logic Validation for US,EU,APAC regions', () => {
  
  beforeEach(() => {
    cy.visit('cypress/fixtures/securityForm.html');
  });

  allRegionValidTestData.forEach((data) => {
    it(`E2E Test for ${data.region} Region: validate each section using valid inputs * sensitiveData : ${data.sensitiveData} ,riskLevel: ${data.riskLevel}, 
        securityMeasures: ${data.securityMeasures} ,encryption: ${data.encryption}, dataResidencyCompliance: ${data.dataResidencyCompliance},
        riskAssessment: ${data.riskAssessment},audit: ${data.audit}`, () => {
      const testData = 'hello';
      cy.simpleCommand(testData).should('eq', testData);
      cy.fillGeneralInfo(data)
        .navigateToAIRiskManagementPage() 
        .verifyTitleOnAIRiskMngmtPage() 
        .selectSensitiveData(data.sensitiveData)  
        .selectRiskLevel(data.riskLevel)
        .navigateToNextSection();
        if (data.sensitiveData === 'Yes' || data.riskLevel === 'High') 
          {
            cy.verifyTitleOnDataSecurityPage()
              .fillDataSecurityDetails(data)
              .navigateToCompliancePage();  
          } 
          cy.verifyTitleOnCompliancePage()
            .completeComplianceMeasures(data)
            .navigateToSummaryPage()
            .validateSummary(data)
            .submitForm();        
    });

  })

  });
 
  describe('General Info Page - Missing Field Validations', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/securityForm.html');
    });

   generalInfoInvalidTestData.forEach((data) => {
      it(`validate General Info Page Warning for missing or invalid fields :: name : ${data.name} ,organization: ${data.organization}, 
          email: ${data.email} ,region: ${data.region}` 
      , function () {   
                cy.fillGeneralInfoWithMissingData(data)
                  .validateGeneralInfoWarnings();
                   });
                  })
   }); 

   describe('AI Risk Management Page - Missing Field Validations', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/securityForm.html');
    });

    aiRiskMngmtInvalidTestData.forEach((data) => {
      it(`validate General Info Page Warning for missing or invalid fields :: sensitiveData : ${data.sensitiveData} ,RiskLevel: ${data.riskLevel}` 
      , function () {   
                cy.fillGeneralInfo(allRegionValidTestData[0])
                  .navigateToAIRiskManagementPage()
                  .selectSensitiveData(data.sensitiveData)
                  .selectRiskLevel(data.riskLevel)
                  .navigateToNextSection()
                  .validateNavigationWarning();
                   });
                  })
   });

   describe('Data Security Page - Missing field validations', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/securityForm.html');
    });

    dataSecurityInvalidTestData.forEach((data) => {
      it(`validate Security Data Page Errors  : ${data.error} for region ${data.region} ,sensitiveData ${data.sensitiveData}, encryption: ${data.securityMeasures},
       datacompliance ${data.dataResidencyCompliance}, encryption implemented ${data.encryption}` 
      , function () {   
                cy.fillGeneralInfo(allRegionValidTestData[0])
                  .navigateToAIRiskManagementPage()
                  .selectSensitiveData(allRegionValidTestData[0].sensitiveData)
                  .selectRiskLevel(allRegionValidTestData[0].riskLevel)
                  .navigateToNextSection()
                  .fillDataSecurityDetails(data)
                  .verifyTitleOnDataSecurityPage()
                  .fillDataSecurityDetails(data)
                  .navigateToCompliancePage()
                  .validateDataSecurityWarnings(data); 
                   });
                  })
   });

   describe('Compliance Measures Page - Missing field validations', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/securityForm.html');
    });

    complianceMeasuresInvalidTestData.forEach((data) => {
      it(`validate Compliance Measures Page Errors  : ` 
      , function () {   
                cy.fillGeneralInfo(data)
                  .navigateToAIRiskManagementPage()
                  .selectSensitiveData(data.sensitiveData)
                  .selectRiskLevel(data.riskLevel)
                  .navigateToNextSection()
                  .fillDataSecurityDetails(data)
                  .verifyTitleOnDataSecurityPage()
                  .fillDataSecurityDetails(data)
                  .navigateToCompliancePage()
                  .completeComplianceMeasures(data)
                  .navigateToSummaryPage()
                  .validateComplianceWarnings(data);
                  
                   });
                  })
   });

 