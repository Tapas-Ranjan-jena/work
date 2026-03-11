import api from '../../api/api';
import type { ApiResponse, PaginatedResponse } from '../clients/types';
import type { Incorporation, CreateIncorporationRequest, UpdateIncorporationRequest } from './types';

const incorporationService = {
    async getIncorporations(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedResponse<Incorporation>> {
        const response = await api.get<ApiResponse<Incorporation[]>>('/incorporations', {
            params: { page, limit, search }
        });
        if (!response.data.data) throw new Error('No data returned from getIncorporations');

        // The API response example shows { success: true, data: [...] }
        // but requirements mention pagination. If the backend doesn't return 
        // a standard PaginatedResponse yet, I'll adapt it.
        // Based on other services, they use response.data.pagination.

        return {
            data: response.data.data,
            pagination: (response.data as any).pagination || { page, limit, total: response.data.data.length }
        };
    },

    async createIncorporation(data: CreateIncorporationRequest): Promise<Incorporation> {
        const response = await api.post<ApiResponse<Incorporation>>('/incorporations', data);
        if (!response.data.data) throw new Error('No data returned from createIncorporation');
        return response.data.data;
    },

    async updateIncorporation(id: number, data: UpdateIncorporationRequest): Promise<Incorporation> {
        const response = await api.put<ApiResponse<Incorporation>>(`/incorporations/${id}`, data);
        if (!response.data.data) throw new Error('No data returned from updateIncorporation');
        return response.data.data;
    }
};

export default incorporationService;
