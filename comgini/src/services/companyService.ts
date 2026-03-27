import api from '../api/api';

export interface CompanySearchResponse {
  success: boolean;
  message: string;
  data: any[];
}

const companyService = {
  async searchCompany(query: string): Promise<CompanySearchResponse> {
    const response = await api.get<CompanySearchResponse>('/company/search', {
      params: { query }
    });
    return response.data;
  }
};

export default companyService;
