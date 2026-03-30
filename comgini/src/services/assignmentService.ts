import api from '../api/api';
import type { 
    Assignment, 
    CreateAssignmentRequest, 
    UserLookup, 
    CompanyLookup, 
    PaginatedAssignmentResponse 
} from './assignmentTypes';

const assignmentService = {
    async getAssignments(status: 'pending' | 'completed', page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedAssignmentResponse> {
        const response = await api.get<PaginatedAssignmentResponse>('/assignments', {
            params: { status, page, limit, search }
        });
        return response.data;
    },

    async assignChecklist(data: CreateAssignmentRequest): Promise<{ success: boolean; message: string; data: Assignment }> {
        const response = await api.post<{ success: boolean; message: string; data: Assignment }>('/assignments', data);
        return response.data;
    },

    async lookupUsers(role: 'maker' | 'checker'): Promise<{ success: boolean; data: UserLookup[] }> {
        const response = await api.get<{ success: boolean; data: UserLookup[] }>('/users', {
            params: { role }
        });
        return response.data;
    },

    async lookupCompanies(): Promise<{ success: boolean; data: CompanyLookup[] }> {
        const response = await api.get<{ success: boolean; data: CompanyLookup[] }>('/companies');
        return response.data;
    },

    async lookupAssignments(): Promise<{ success: boolean; data: { id: number; title: string }[] }> {
        const response = await api.get<{ success: boolean; data: { id: number; title: string }[] }>('/assignments/lookup');
        return response.data;
    },

    async deleteAssignment(id: number): Promise<{ success: boolean; message: string }> {
        const response = await api.delete<{ success: boolean; message: string }>(`/assignments/${id}`);
        return response.data;
    }
};

export default assignmentService;
