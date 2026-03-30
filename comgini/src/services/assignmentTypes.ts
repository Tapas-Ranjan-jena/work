export interface Assignment {
    id: number;
    company_id: number;
    company_name: string;
    checklist_id: number;
    checklist_title: string;
    maker_id: number;
    maker_name: string;
    checker_id: number;
    checker_name: string;
    status: 'pending' | 'completed';
    last_updated_by?: string;
    last_updated_on?: string;
    due_date: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAssignmentRequest {
    companyId: string | number;
    checklistId: string | number;
    makerId: string | number;
    checkerId: string | number;
    dueDate: string;
}

export interface UserLookup {
    id: number;
    name: string;
    role: string;
}

export interface CompanyLookup {
    id: number;
    name: string;
}

export interface PaginatedAssignmentResponse {
    success: boolean;
    data: Assignment[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
    };
}
