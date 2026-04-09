import api from '../api/api';

export interface Insurance {
    id: number;
    company_id: number;
    insurance_company: string;
    broker_name: string;
    policy_type: string;
    policy_number: string;
    sum_insured: number;
    policy_commencement_date: string;
    renewal_date: string;
    start_from: string;
    expiry_date: string;
    amount_paid: number;
    mode_of_payment: string;
    asset_insured: string;
    payment_date: string;
    key_terms: string;
    alert_user: string;
    alert_before: string;
    remarks: string;
    file_url?: string | null;
    created_at?: string;
    updated_at?: string;
    company_name?: string;
}

export interface CreateInsuranceRequest extends Omit<Insurance, 'id' | 'created_at' | 'updated_at' | 'company_name'> {}

export interface Contract {
    id: number;
    company_id: number;
    category: string;
    contract_name: string;
    contract_value: number;
    contract_period: string;
    name_of_party: string;
    date_of_execution: string;
    start_from: string;
    expiry_date: string;
    key_terms: string;
    alert_user: string;
    alert_before: string;
    remarks: string;
    file_url?: string | null;
    created_at?: string;
    updated_at?: string;
    company_name?: string;
}

export interface CreateContractRequest extends Omit<Contract, 'id' | 'created_at' | 'updated_at' | 'company_name'> {}

export interface PaginatedContractsResponse {
    data: Contract[];
    pagination: {
        page: number;
        limit: number;
        total: number;
    };
}

export const businessManagerService = {
    // Create Insurance
    async createInsurance(data: CreateInsuranceRequest): Promise<{ id: number }> {
        const response = await api.post('/business/insurance', data);
        return response.data.data;
    },

    // Get Insurance List
    async getInsurance(params: { page?: number; limit?: number; company_id?: number }): Promise<Insurance[]> {
        const response = await api.get('/business-manager/insurance', { params });
        return response.data.data;
    },

    // Get Contracts List
    async getContracts(params: { page?: number; limit?: number; search?: string; company_id?: number }): Promise<PaginatedContractsResponse> {
        const response = await api.get('/business-manager/contracts', { params });
        return {
            data: response.data.data || [],
            pagination: response.data.pagination || { page: 1, limit: 20, total: 0 }
        };
    },

    // Create Contract
    async createContract(data: CreateContractRequest): Promise<{ id: number }> {
        const response = await api.post('/business/contracts', data);
        return response.data.data;
    }
};

export default businessManagerService;
