export interface Timesheet {
    id: string;
    member: string;
    client: string;
    task: string;
    start_time: string;
    end_time: string;
    total_hours: number | null;
}

export interface PaginatedTimesheets {
    total: number;
    page: number;
    limit: number;
    timesheets: Timesheet[];
}

export interface TimesheetSummary {
    member_id: number;
    first_name: string;
    last_name: string;
    tasks_worked: number;
    total_minutes: number;
}

export interface CreateTimesheetRequest {
    memberId: number | string;
    clientId: number | string;
    task?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    note?: string;
}

export interface UpdateTimesheetRequest {
    task?: string;
    memberId?: number | string;
    clientId?: number | string;
    startDate?: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    note?: string;
}

export interface TimesheetResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
