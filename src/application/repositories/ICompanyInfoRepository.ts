/**
 * ICompanyInfoRepository
 * Repository interface for Company Information data access
 * Following Clean Architecture - Application layer
 */

export interface CompanyFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyStat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  lineId: string;
  lineUrl: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  features: CompanyFeature[];
  stats: CompanyStat[];
}

export interface ICompanyInfoRepository {
  /**
   * Get company information
   */
  getInfo(): Promise<CompanyInfo>;

  /**
   * Get company features
   */
  getFeatures(): Promise<CompanyFeature[]>;

  /**
   * Get company statistics
   */
  getStats(): Promise<CompanyStat[]>;
}
