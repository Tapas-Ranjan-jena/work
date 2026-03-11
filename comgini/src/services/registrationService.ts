import api from '../api/api';
import type { ApiResponse, PaginatedResponse } from './clients/types';

export interface Registration {
    id: number;
    company_id: number;
    document_type: string;
    document_number: string;
    issuing_authority: string;
    issue_date: string;
    expiry_date: string;
    status: string;
    file_url: string | null;
    alert_days_before: number;
    company_name: string;
}

export interface CreateRegistrationRequest {
    company_id: number;
    document_type: string;
    document_number: string;
    issuing_authority: string;
    issue_date: string;
    expiry_date: string;
    alert_days_before: number;
}

export interface ExpiringRegistration {
    company_name: string;
    document_type: string;
    document_number: string;
    expiry_date: string;
    days_remaining: number;
}

const registrationService = {
    async getRegistrations(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedResponse<Registration>> {
        const response = await api.get<ApiResponse<Registration[]>>('/business/registrations', {
            params: { page, limit, search }
        });

        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    async createRegistration(data: CreateRegistrationRequest): Promise<Registration> {
        const response = await api.post<ApiResponse<Registration>>('/business/registrations', data);
        if (!response.data.data) throw new Error('Failed to create registration');
        return response.data.data;
    },

    async getExpiringRegistrations(days: number = 30): Promise<ExpiringRegistration[]> {
        const response = await api.get<ApiResponse<ExpiringRegistration[]>>('/business/expiring', {
            params: { days }
        });
        return response.data.data || [];
    }
};

export default registrationService;
