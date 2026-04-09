import api from '../api/api';
import type { 
    Timesheet, 
    TimesheetSummary, 
    CreateTimesheetRequest, 
    UpdateTimesheetRequest,
    TimesheetResponse,
    PaginatedTimesheets
} from './timesheetTypes';

export interface GetTimesheetsParams {
    page?: number;
    limit?: number;
    member_id?: number | string;
    client_id?: number | string;
    fromDate?: string;
    toDate?: string;
}

const timesheetService = {
    async getTimesheets(params?: GetTimesheetsParams): Promise<TimesheetResponse<PaginatedTimesheets>> {
        const response = await api.get<TimesheetResponse<PaginatedTimesheets>>('/timesheets', { params });
        return response.data;
    },

    async getSummary(fromDate?: string, toDate?: string): Promise<TimesheetResponse<TimesheetSummary[]>> {
        const response = await api.get<TimesheetResponse<TimesheetSummary[]>>('/timesheets/summary', {
            params: { fromDate, toDate }
        });
        return response.data;
    },

    async createTimesheet(data: CreateTimesheetRequest): Promise<TimesheetResponse<{id: string}>> {
        const response = await api.post<TimesheetResponse<{id: string}>>('/timesheets', data);
        return response.data;
    },

    async updateTimesheet(id: string, data: UpdateTimesheetRequest): Promise<TimesheetResponse<Timesheet>> {
        const response = await api.put<TimesheetResponse<Timesheet>>(`/timesheets/${id}`, data);
        return response.data;
    },

    async deleteTimesheet(id: string): Promise<TimesheetResponse<null>> {
        const response = await api.delete<TimesheetResponse<null>>(`/timesheets/${id}`);
        return response.data;
    }
};

export default timesheetService;
