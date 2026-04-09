import api from '../api/api';

export interface Lead {
    id: string;
    title: string;
    company_name: string;
    primary_contact: string;
    owner: string;
    status: string;
    source: string;
}

export interface LeadsListResponse {
    total: number;
    page: number;
    limit: number;
    leads: Lead[];
}

export interface LeadsKanbanResponse {
    [statusKey: string]: Lead[];
}

export interface CreateLeadRequest {
    title: string;
    company_name: string;
    status: string;
    owner_id: number;
    source: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    phone?: string;
    website?: string;
    gstin?: string;
}

export interface UpdateLeadRequest extends Partial<CreateLeadRequest> {}

export const leadsService = {
    async getLeadsList(params: { page?: number; limit?: number; owner?: string; source?: string; status?: string; search?: string }): Promise<LeadsListResponse> {
        const response = await api.get('/leads', { params });
        return response.data.data;
    },

    async getLeadsKanban(): Promise<LeadsKanbanResponse> {
        const response = await api.get('/leads/kanban');
        return response.data.data;
    },

    async createLead(data: CreateLeadRequest): Promise<{ id: string }> {
        const response = await api.post('/leads', data);
        return response.data.data;
    },

    async updateLead(id: string, data: UpdateLeadRequest): Promise<{ id: string }> {
        const response = await api.put(`/leads/${id}`, data);
        return response.data.data;
    },

    async deleteLead(id: string): Promise<void> {
        await api.delete(`/leads/${id}`);
    }
};

export default leadsService;
