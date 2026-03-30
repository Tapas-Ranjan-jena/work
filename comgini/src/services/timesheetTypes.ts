export interface Timesheet {
    id: number;
    member_id: number;
    member_name: string;
    assignment_id: number;
    assignment_title: string;
    client_id: number;
    client_name: string;
    task: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    total_minutes: number;
    note?: string;
    created_at: string;
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
    assignmentId?: number | string;
    task?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    note?: string;
}

export interface TimesheetResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}
