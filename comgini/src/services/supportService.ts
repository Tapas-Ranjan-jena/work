import api from '../api/api';
import type { 
    SupportTicket, 
    CreateTicketRequest, 
    ResolveTicketRequest, 
    TicketResponse 
} from './supportTypes';

const supportService = {
    async getTickets(page: number = 1, limit: number = 20): Promise<TicketResponse<SupportTicket[]>> {
        const response = await api.get<TicketResponse<SupportTicket[]>>('/support/tickets', {
            params: { page, limit }
        });
        return response.data;
    },

    async createTicket(data: CreateTicketRequest): Promise<TicketResponse<SupportTicket>> {
        const response = await api.post<TicketResponse<SupportTicket>>('/support/tickets', data);
        return response.data;
    },

    async resolveTicket(id: number, data: ResolveTicketRequest): Promise<TicketResponse<SupportTicket>> {
        const response = await api.put<TicketResponse<SupportTicket>>(`/support/tickets/${id}`, data);
        return response.data;
    }
};

export default supportService;
