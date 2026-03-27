export interface Employee {
    id: number;
    user_id: number;
    employee_code: string;
    department: string;
    designation: string;
    date_of_joining: string;
    date_of_leaving: string | null;
    salary: string | number;
    bank_account: string | null;
    ifsc_code: string | null;
    pan: string | null;
    aadhaar: string | null;
    emergency_contact: string | null;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export interface CreateEmployeeRequest {
    user_id: number;
    employee_code: string;
    department: string;
    designation: string;
    date_of_joining: string;
    salary: number;
    pan?: string;
    emergency_contact?: string;
}

export interface LeaveRequest {
    id: number;
    employee_id: number;
    leave_type: 'casual' | 'sick' | 'earned' | 'maternity' | 'paternity' | 'unpaid';
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    approved_by: number | null;
    created_at: string;
    updated_at: string;
}

export interface ApplyLeaveRequest {
    leave_type: string;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
}

export interface AttendanceRecord {
    id: number;
    employee_id: number;
    date: string;
    in_time: string;
    out_time: string | null;
    working_hours: string | null;
    status: 'present' | 'absent' | 'half_day';
    notes: string | null;
    created_at: string;
    first_name: string;
    last_name: string;
}
