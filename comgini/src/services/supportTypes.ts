export interface SupportTicket {
    id: number;
    user_id: number;
    subject: string;
    description: string;
    category: string;
    priority: string;
    status: 'open' | 'resolved';
    screenshot_url: string | null;
    resolution_notes: string | null;
    resolved_at: string | null;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface CreateTicketRequest {
    subject: string;
    description: string;
    category: string;
    priority: string;
    screenshot_url?: string;
}

export interface ResolveTicketRequest {
    status: 'resolved';
    resolution_notes: string;
}

export interface TicketResponse<T> {
    success: boolean;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
    };
}
