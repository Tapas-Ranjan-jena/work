import api from '../api/api';
import type { 
    Timesheet, 
    TimesheetSummary, 
    CreateTimesheetRequest, 
    TimesheetResponse 
} from './timesheetTypes';

const timesheetService = {
    async getTimesheets(fromDate: string, toDate: string): Promise<TimesheetResponse<Timesheet[]>> {
        const response = await api.get<TimesheetResponse<Timesheet[]>>('/timesheets', {
            params: { fromDate, toDate }
        });
        return response.data;
    },

    async getSummary(fromDate: string, toDate: string): Promise<TimesheetResponse<TimesheetSummary[]>> {
        const response = await api.get<TimesheetResponse<TimesheetSummary[]>>('/timesheets/summary', {
            params: { fromDate, toDate }
        });
        return response.data;
    },

    async createTimesheet(data: CreateTimesheetRequest): Promise<TimesheetResponse<Timesheet>> {
        const response = await api.post<TimesheetResponse<Timesheet>>('/timesheets', data);
        return response.data;
    }
};

export default timesheetService;
