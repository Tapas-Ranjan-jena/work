import api from "../api/api";
import type { ApiResponse } from "./clients/types";

export interface Event {
    id: number;
    title: string;
    description?: string;
    event_type: string;
    start_datetime: string;
    end_datetime: string;
    location?: string;
    is_all_day?: boolean;
    company_id?: number;
    client_id: number;
}

export interface CreateEventRequest {
    title: string;
    description?: string;
    event_type: string;
    start_datetime: string;
    end_datetime: string;
    location?: string;
    company_id?: number | null;
    attendee_ids: number[];
}

const eventsService = {
    getEvents: async (start_date: string, end_date: string): Promise<ApiResponse<Event[]>> => {
        const response = await api.get(`/events`, {
            params: { start_date, end_date }
        });
        return response.data;
    },

    createEvent: async (payload: CreateEventRequest): Promise<ApiResponse<Event>> => {
        const response = await api.post(`/events`, payload);
        return response.data;
    },

    respondToEvent: async (id: number, status: string): Promise<ApiResponse<any>> => {
        const response = await api.put(`/events/${id}/respond`, { status });
        return response.data;
    }
};

export default eventsService;
