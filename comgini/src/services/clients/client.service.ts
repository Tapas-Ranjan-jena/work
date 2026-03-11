import api from '../../api/api';
import type {
    ApiResponse,
    Client,
    PaginatedResponse,
    CreateClientRequest,
    UpdateClientRequest,
    CreateContactRequest,
    ClientContact,
    CreateClientPortalUserRequest
} from './types';

const clientService = {
    async getClients(page: number, limit: number): Promise<PaginatedResponse<Client>> {
        const response = await api.get<ApiResponse<any>>('/clients', {
            params: { page, limit }
        });
        const resData = response.data.data;
        if (!resData) throw new Error('No data returned from getClients');
        return {
            data: resData,
            pagination: (response.data as any).pagination
        };
    },

    async searchClients(search: string, page: number, limit: number): Promise<PaginatedResponse<Client>> {
        const response = await api.get<ApiResponse<any>>('/clients', {
            params: { search, page, limit }
        });
        const resData = response.data.data;
        if (!resData) throw new Error('No data returned from searchClients');
        return {
            data: resData,
            pagination: (response.data as any).pagination
        };
    },

    async getClientById(id: number): Promise<Client> {
        const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
        if (!response.data.data) throw new Error('No data returned from getClientById');
        return response.data.data;
    },

    async createClient(data: CreateClientRequest): Promise<Client> {
        const response = await api.post<ApiResponse<Client>>('/clients', data);
        if (!response.data.data) throw new Error('No data returned from createClient');
        return response.data.data;
    },

    async updateClient(id: number, data: UpdateClientRequest): Promise<Client> {
        const response = await api.put<ApiResponse<Client>>(`/clients/${id}`, data);
        if (!response.data.data) throw new Error('No data returned from updateClient');
        return response.data.data;
    },

    async deleteClient(id: number): Promise<void> {
        await api.delete<ApiResponse<void>>(`/clients/${id}`);
    },

    async addClientContact(clientId: number, data: CreateContactRequest): Promise<ClientContact> {
        const response = await api.post<ApiResponse<ClientContact>>(`/clients/${clientId}/contacts`, data);
        if (!response.data.data) throw new Error('No data returned from addClientContact');
        return response.data.data;
    },

    deleteClientContact: async (clientId: number, contactId: number): Promise<ApiResponse<void>> => {
        const response = await api.delete(`/clients/${clientId}/contacts/${contactId}`);
        return response.data;
    },

    async getClientContacts(clientId: number): Promise<ClientContact[]> {
        const response = await api.get<ApiResponse<ClientContact[]>>(`/clients/${clientId}/contacts`);
        if (!response.data.data) throw new Error('No data returned from getClientContacts');
        return response.data.data;
    },

    async getContacts(): Promise<ClientContact[]> {
        // Assuming there's a global /contacts endpoint based on requirement 1
        const response = await api.get<ApiResponse<ClientContact[]>>('/contacts');
        if (!response.data.data) throw new Error('No data returned from getContacts');
        return response.data.data;
    },

    createClientPortalUser: async (data: CreateClientPortalUserRequest): Promise<ApiResponse<any>> => {
        const response = await api.post("/clients/portal-users", data);
        return response.data;
    },

    async getClientPortalUsers(clientId: number): Promise<any[]> {
        const response = await api.get<ApiResponse<any[]>>(`/clients/${clientId}/portal-users`);
        if (!response.data.data) throw new Error('No data returned from getClientPortalUsers');
        return response.data.data;
    },

    async deleteClientPortalUser(clientId: number, userId: number): Promise<void> {
        await api.delete(`/clients/${clientId}/portal-users/${userId}`);
    }
};

export default clientService;
