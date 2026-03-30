import api from '../api/api';
import type { Checklist, CreateChecklistRequest, PaginatedChecklistResponse } from './checklistTypes';

const checklistService = {
    async getChecklists(page: number = 1, limit: number = 10, search: string = ''): Promise<PaginatedChecklistResponse> {
        const response = await api.get<PaginatedChecklistResponse>('/checklists', {
            params: { page, limit, search }
        });
        return response.data;
    },

    async createChecklist(data: CreateChecklistRequest): Promise<{ success: boolean; message: string; data: Checklist }> {
        const response = await api.post<{ success: boolean; message: string; data: Checklist }>('/checklists', data);
        return response.data;
    },

    async deleteChecklist(id: number): Promise<{ success: boolean; message: string }> {
        const response = await api.delete<{ success: boolean; message: string }>(`/checklists/${id}`);
        return response.data;
    },

    async importChecklist(file: File): Promise<{ success: boolean; message: string }> {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post<{ success: boolean; message: string }>('/checklists/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};

export default checklistService;
