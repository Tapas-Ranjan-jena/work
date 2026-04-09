import api from '../api/api';

export interface DropdownUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export interface DropdownClient {
    id: number;
    name: string;
    email: string;
    phone: string;
    company_name: string;
    cin: string;
    pan: string;
    gstin: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    client_group: string;
    risk_score: string;
    status: string;
}

export interface DropdownAssignment {
    id: number;
    companyName: string;
    assignment: string;
    maker: string;
    checker: string;
    status: string;
    dueDate: string;
}

export interface DropdownCompany {
    id: number;
    name: string;
}

export const dropdownService = {
    // 1. Users Dropdown
    async getUsers(): Promise<DropdownUser[]> {
        const response = await api.get('/users');
        return response.data.data || [];
    },

    // 2. Clients Dropdown
    async getClients(page: number = 1, limit: number = 100, search: string = ''): Promise<{ data: DropdownClient[], pagination: any }> {
        const response = await api.get('/clients', {
            params: { page, limit, search }
        });
        return {
            data: response.data.data || [],
            pagination: response.data.pagination || {}
        };
    },

    // 3. Assignments Dropdown
    async getAssignments(page: number = 1, limit: number = 50, status: string = ''): Promise<{ data: DropdownAssignment[], pagination: any }> {
        const response = await api.get('/assignments', {
            params: { page, limit, status }
        });
        return {
            data: response.data.data || [],
            pagination: response.data.pagination || {}
        };
    },

    // 4. Companies (Assignments) Dropdown
    async getAssignmentsCompanies(): Promise<DropdownCompany[]> {
        const response = await api.get('/assignments/companies');
        return response.data.data || [];
    },

    // 5. Leads Sources Dropdown
    async getLeadsSources(): Promise<string[]> {
        const response = await api.get('/leads/sources');
        return response.data.data || [];
    },

    // 6. Leads Status List Dropdown
    async getLeadsStatusList(): Promise<string[]> {
        const response = await api.get('/leads/status');
        return response.data.data || [];
    }
};

export default dropdownService;
