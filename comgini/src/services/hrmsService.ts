import { apiRequest } from "../api/api";

// HRMS PAYLOAD TYPES
export interface CreateEmployeePayload {
    user_id: number;
    employee_code: string;
    department: string;
    designation: string;
    date_of_joining: string; // "YYYY-MM-DD"
    salary: number;
    pan: string;
    emergency_contact: string;
}

export interface LeavePayload {
    leave_type: "casual" | "sick" | "earned" | string;
    start_date: string; // "YYYY-MM-DD"
    end_date: string; // "YYYY-MM-DD"
    total_days: number;
    reason: string;
}

const hrmsService = {
    /** GET ALL EMPLOYEES */
    getEmployees: async () => {
        return apiRequest("/hrms/employees");
    },

    /** CREATE EMPLOYEE */
    createEmployee: async (payload: CreateEmployeePayload) => {
        return apiRequest("/hrms/employees", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** CLOCK IN */
    clockIn: async (employeeId: number) => {
        return apiRequest("/hrms/attendance/clock-in", {
            method: "POST",
            body: JSON.stringify({ employee_id: employeeId })
        });
    },

    /** CLOCK OUT */
    clockOut: async (employeeId: number) => {
        return apiRequest("/hrms/attendance/clock-out", {
            method: "PUT",
            body: JSON.stringify({ employee_id: employeeId })
        });
    },

    /** GET ATTENDANCE */
    getAttendance: async (month: number, year: number) => {
        return apiRequest(`/hrms/attendance?month=${month}&year=${year}`);
    },

    /** APPLY LEAVE */
    applyLeave: async (payload: LeavePayload) => {
        return apiRequest("/hrms/leaves", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** APPROVE OR REJECT LEAVE */
    approveLeave: async (id: number, status: "approved" | "rejected") => {
        return apiRequest(`/hrms/leaves/${id}/approve`, {
            method: "PUT",
            body: JSON.stringify({ status })
        });
    }
};

export default hrmsService;

