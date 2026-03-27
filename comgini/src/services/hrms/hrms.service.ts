import api from '../../api/api';
import type { Employee, CreateEmployeeRequest, LeaveRequest, ApplyLeaveRequest, AttendanceRecord } from './types';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

const hrmsService = {
    // ─── EMPLOYEES ───────────────────────────────────────────────────────────────
    async getEmployees(): Promise<Employee[]> {
        const response = await api.get<ApiResponse<Employee[]>>('/hrms/employees');
        return response.data.data || [];
    },

    async createEmployee(data: CreateEmployeeRequest): Promise<Employee> {
        const response = await api.post<ApiResponse<Employee>>('/hrms/employees', data);
        if (!response.data.data) throw new Error('Failed to create employee');
        return response.data.data;
    },

    // ─── LEAVES ──────────────────────────────────────────────────────────────────
    async getLeaves(): Promise<LeaveRequest[]> {
        const response = await api.get<ApiResponse<LeaveRequest[]>>('/hrms/leaves');
        return response.data.data || [];
    },

    async applyLeave(data: ApplyLeaveRequest): Promise<LeaveRequest> {
        const response = await api.post<ApiResponse<LeaveRequest>>('/hrms/leaves', data);
        if (!response.data.data) throw new Error('Failed to apply leave');
        return response.data.data;
    },

    async approveRejectLeave(id: number, status: 'approved' | 'rejected'): Promise<LeaveRequest> {
        const response = await api.put<ApiResponse<LeaveRequest>>(`/hrms/leaves/${id}/approve`, { status });
        if (!response.data.data) throw new Error('Failed to update leave status');
        return response.data.data;
    },

    // ─── ATTENDANCE ──────────────────────────────────────────────────────────────
    async getAttendance(month: number, year: number): Promise<AttendanceRecord[]> {
        const response = await api.get<ApiResponse<AttendanceRecord[]>>('/hrms/attendance', {
            params: { month, year }
        });
        return response.data.data || [];
    },

    async clockIn(): Promise<AttendanceRecord> {
        const response = await api.post<ApiResponse<AttendanceRecord>>('/hrms/clock-in', {});
        if (!response.data.data) throw new Error('Failed to clock in');
        return response.data.data;
    },

    async clockOut(): Promise<AttendanceRecord> {
        const response = await api.put<ApiResponse<AttendanceRecord>>('/hrms/clock-out', {});
        if (!response.data.data) throw new Error('Failed to clock out');
        return response.data.data;
    },
};

export default hrmsService;
