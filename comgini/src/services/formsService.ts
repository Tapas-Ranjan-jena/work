import api from '../api/api';

export interface FormResponse {
  success: boolean;
  message: string;
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const formsService = {
  async getForms(type: string, status: string, page: number = 1, limit: number = 10, search: string = ''): Promise<FormResponse> {
    const response = await api.get<FormResponse>('/forms', {
      params: { type, status, page, limit, search }
    });
    return response.data;
  }
};

export default formsService;
