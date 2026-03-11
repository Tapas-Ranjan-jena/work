export interface Incorporation {
    id: number;
    form_type: string;
    proposed_name_1: string;
    proposed_name_2: string;
    srn: string | null;
    mca_user: string;
    submission_status: 'draft' | 'submitted' | 'approved' | 'rejected';
    approval_date: string | null;
    expiry_date: string | null;
    fee_paid: string | number;
    remarks: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    created_by_name: string;
}

export interface CreateIncorporationRequest {
    form_type: string;
    proposed_name_1: string;
    proposed_name_2: string;
    mca_user: string;
    submission_status: string;
    fee_paid: number;
    remarks: string;
}

export interface UpdateIncorporationRequest {
    form_type?: string;
    proposed_name_1?: string;
    proposed_name_2?: string;
    srn?: string;
    mca_user?: string;
    submission_status?: string;
    approval_date?: string;
    expiry_date?: string;
    fee_paid?: number;
    remarks?: string;
}
