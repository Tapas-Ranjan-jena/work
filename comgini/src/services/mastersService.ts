import api from '../api/api';
import type {
    ApiResponse,
    PaginatedResponse,
    Company, CreateCompanyRequest, UpdateCompanyRequest,
    Director, CreateDirectorRequest, UpdateDirectorRequest,
    RTA, CreateRTARequest, LinkCompanyRTARequest,
    PCSFirm, CreatePCSFirmRequest,
    Auditor, CreateAuditorRequest,
    ClientGroup, CreateClientGroupRequest,
    GenerateMISRequest, MISReport, PrimaryContact
} from '../types/masters.types';

const mastersService = {
    // --- Companies ---

    async getCompanies(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Company>> {
        const response = await api.get<ApiResponse<Company[]>>('/masters/companies', {
            params: { page, limit }
        });

        // Handling response structure as per example
        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    async createCompany(data: CreateCompanyRequest): Promise<Company> {
        const response = await api.post<ApiResponse<Company>>('/masters/companies', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create company');
        return response.data.data!;
    },

    async updateCompany(id: number, data: UpdateCompanyRequest): Promise<Company> {
        const response = await api.put<ApiResponse<Company>>(`/masters/companies/${id}`, data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to update company');
        return response.data.data!;
    },

    async deleteCompany(id: number): Promise<void> {
        const response = await api.delete<ApiResponse>(`/masters/companies/${id}`);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to delete company');
    },

    // --- Directors ---

    async getDirectors(companyId: number): Promise<Director[]> {
        const response = await api.get<ApiResponse<Director[]>>(`/masters/companies/${companyId}/directors`);
        return response.data.data || [];
    },

    async createDirector(companyId: number, data: CreateDirectorRequest): Promise<Director> {
        const response = await api.post<ApiResponse<Director>>(`/masters/companies/${companyId}/directors`, data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create director');
        return response.data.data!;
    },

    async updateDirector(id: number, data: UpdateDirectorRequest): Promise<Director> {
        const response = await api.put<ApiResponse<Director>>(`/masters/directors/${id}`, data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to update director');
        return response.data.data!;
    },

    // --- RTA ---

    async getRTAs(): Promise<RTA[]> {
        const response = await api.get<ApiResponse<RTA[]>>('/masters/rta');
        return response.data.data || [];
    },

    async createRTA(data: CreateRTARequest): Promise<RTA> {
        const response = await api.post<ApiResponse<RTA>>('/masters/rta', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create RTA');
        return response.data.data!;
    },

    async linkCompanyToRTA(data: LinkCompanyRTARequest): Promise<void> {
        const response = await api.post<ApiResponse>('/masters/rta/link', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to link company to RTA');
    },

    // --- PCS Firms ---

    async getPCSFirms(): Promise<PCSFirm[]> {
        const response = await api.get<ApiResponse<PCSFirm[]>>('/masters/pcs-firms');
        return response.data.data || [];
    },

    async createPCSFirm(data: CreatePCSFirmRequest): Promise<PCSFirm> {
        const response = await api.post<ApiResponse<PCSFirm>>('/masters/pcs-firms', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create PCS Firm');
        return response.data.data!;
    },

    // --- Auditors ---

    async getAuditors(category: string): Promise<Auditor[]> {
        const response = await api.get<ApiResponse<Auditor[]>>('/auditors', {
            params: { category }
        });
        return response.data.data || [];
    },

    async createAuditor(data: CreateAuditorRequest): Promise<Auditor> {
        const response = await api.post<ApiResponse<Auditor>>('/auditors', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create auditor');
        return response.data.data!;
    },

    async getCompanyWiseAuditors(companyId: number, page: number = 1, limit: number = 20): Promise<Auditor[]> {
        const response = await api.get<ApiResponse<Auditor[]>>('/auditors/company-wise', {
            params: { company_id: companyId, page, limit }
        });
        return response.data.data || [];
    },

    async uploadADT1(data: FormData): Promise<void> {
        const response = await api.post<ApiResponse>('/auditors/adt1-upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (!response.data.success) throw new Error(response.data.message || 'Failed to upload ADT-1');
    },

    // --- Client Groups ---
    async getClientGroups(page: number = 1, limit: number = 20): Promise<PaginatedResponse<ClientGroup>> {
        const response = await api.get<ApiResponse<ClientGroup[]>>('/client-groups', {
            params: { page, limit }
        });

        // Handling response structure as per example
        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    async createClientGroup(data: CreateClientGroupRequest): Promise<ClientGroup> {
        const response = await api.post<ApiResponse<ClientGroup>>('/client-groups', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create client group');
        return response.data.data!;
    },

    // --- MIS Report ---
    async searchMCACompanies(search: string, limit: number = 20): Promise<Company[]> {
        const response = await api.get<ApiResponse<Company[]>>('/companies/mca', {
            params: { search, limit }
        });
        return response.data.data || [];
    },

    async generateMISReport(data: GenerateMISRequest): Promise<MISReport> {
        const response = await api.post<ApiResponse<MISReport>>('/mis-report/generate', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to generate MIS report');
        return response.data.data!;
    },

    async getMISReportHistory(companyId?: number, page: number = 1, limit: number = 20): Promise<PaginatedResponse<MISReport>> {
        const params: any = { page, limit };
        if (companyId) params.company_id = companyId;

        const response = await api.get<ApiResponse<MISReport[]>>('/mis-report/history', { params });
        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    // --- Others ---
    async getPrimaryContacts(): Promise<PrimaryContact[]> {
        const response = await api.get<ApiResponse<PrimaryContact[]>>('/clients/primary-contacts');
        return response.data.data || [];
    }
};

export default mastersService;
