import api from '../api/api';
import type { 
    Assignment, 
    CreateAssignmentRequest, 
    UserLookup, 
    CompanyLookup, 
    PaginatedAssignmentResponse 
} from './assignmentTypes';

const legacyBaseURL = import.meta.env.VITE_API_BASE_URL 
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/v1\/?$/, '') 
    : 'http://13.126.81.144:3000/api';

const config = { baseURL: legacyBaseURL };

const assignmentService = {
    async getAssignments(status: 'pending' | 'completed', page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedAssignmentResponse> {
        const response = await api.get<PaginatedAssignmentResponse>('/assignments', {
            ...config,
            params: { status, page, limit, search }
        });
        return response.data;
    },

    async assignChecklist(data: CreateAssignmentRequest): Promise<{ success: boolean; message: string; data: Assignment }> {
        const response = await api.post<{ success: boolean; message: string; data: Assignment }>('/assignments', data, config);
        return response.data;
    },

    async lookupUsers(role: 'maker' | 'checker'): Promise<{ success: boolean; data: UserLookup[] }> {
        const response = await api.get<{ success: boolean; data: UserLookup[] }>('/users', {
            ...config,
            params: { role }
        });
        return response.data;
    },

    async lookupCompanies(): Promise<{ success: boolean; data: CompanyLookup[] }> {
        const response = await api.get<{ success: boolean; data: CompanyLookup[] }>('/companies', config);
        return response.data;
    },

    async lookupAssignments(): Promise<{ success: boolean; data: { id: number; title: string }[] }> {
        const response = await api.get<{ success: boolean; data: { id: number; title: string }[] }>('/assignments/lookup', config);
        return response.data;
    },

    async deleteAssignment(id: number): Promise<{ success: boolean; message: string }> {
        const response = await api.delete<{ success: boolean; message: string }>(`/assignments/${id}`, config);
        return response.data;
    }
};

export default assignmentService;
