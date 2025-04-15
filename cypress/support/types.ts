export interface GeneralInfoData {
    name: string;
    organization: string;
    email: string;
    region: string;
    sensitiveData: string;
    riskLevel: string;
    securityMeasures: string;
    encryption: string;
    dataResidencyCompliance: string;
    riskAssessment?: string;
    audit?: string;
    error?: string;
  }

export interface DataSecurityData {
    name: string;
    organization: string;
    email: string;
    region: string;
    sensitiveData: string;
    riskLevel: string;
    securityMeasures: string;
    encryption: string;
    dataResidencyCompliance: string;
    error: string;
  }

  export interface GeneralInfoMissingData{
    name: string;
    organization: string;
    email: string;
    region: string;
  }