export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}

// --- Company Types ---

export interface Company {
    id: number;
    name: string;
    cin: string;
    llpin: string | null;
    company_type: string;
    status: string;
    roc: string;
    registration_date: string;
    email: string;
    address: string;
    authorized_capital: string;
    paid_up_capital: string;
}

export interface ClientGroup {
    id: number;
    title: string;
    contact_name: string;
    contact_no: string;
    email: string;
    created_at: string;
}

export interface CreateClientGroupRequest {
    title: string;
    contact_name: string;
    contact_no: string;
    email: string;
}


export interface GenerateMISRequest {
    company_id: number;
    date: string;
    type: "company" | "llp";
}

export interface MISReport {
    id: number;
    company_id: number;
    mis_date: string;
    type: string;
    generated_by: string;
    origin: string;
    export_link: string;
    generated_on: string;
    created_at: string;
    generated_for: string;
}

export interface PrimaryContact {
    id: number;
    client_id: number;
    name: string;
    designation: string;
    email: string;
    phone: string;
    is_primary: boolean;
    created_at: string;
    client_name: string;
    company_name: string;
}

export interface CreateCompanyRequest {
    name: string;
    cin: string;
    company_type: "company" | "llp";
    status: "Active" | "Inactive";
    roc: string;
    registration_date: string; // YYYY-MM-DD
    email: string;
    address: string;
    authorized_capital: number;
    paid_up_capital: number;
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> { }

// --- Director Types ---

export interface Director {
    id: number;
    company_id: number;
    din: string;
    name: string;
    designation: string;
    appointment_date: string;
    cessation_date: string | null;
    tenure_years: number;
    is_active: boolean;
}

export interface CreateDirectorRequest {
    din: string;
    name: string;
    designation: string;
    appointment_date: string; // YYYY-MM-DD
    tenure_years: number;
}

export interface UpdateDirectorRequest extends CreateDirectorRequest {
    is_active: boolean;
}

// --- RTA Types ---

export interface RTA {
    id: number;
    name: string;
    address: string;
    contact_person: string;
    phone: string;
    email: string;
    isin_code: string;
}

export interface CreateRTARequest {
    name: string;
    address: string;
    contact_person: string;
    phone: string;
    email: string;
    isin_code: string;
}

export interface LinkCompanyRTARequest {
    company_id: number;
    rta_id: number;
}

// --- PCS Firm Types ---

export interface PCSFirm {
    id: number;
    firm_name: string;
    urn: string;
    address: string;
    gstin: string;
    pan: string;
    contact_person: string;
    phone: string;
    email: string;
    firm_type: string;
}

export interface CreatePCSFirmRequest {
    firm_name: string;
    urn: string;
    address: string;
    gstin: string;
    pan: string;
    contact_person: string;
    phone: string;
    email: string;
    firm_type: "pcs";
}

// --- Auditor Types ---

export interface Auditor {
    id: number;
    company_id: number;
    category: string;
    firm_registration_number: string;
    firm_name: string;
    pan: string;
    firm_email: string;
    address: string;
    country: string;
    state: string;
    city: string;
    membership_number: string;
    auditor_name: string;
    mobile: string;
    email: string;
    designation: string;
    certificate_of_practice?: string;
    letterhead_type?: "standard" | "custom";
    created_by?: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateAuditorRequest {
    company_id: number;
    category: string;
    firm_registration_number: string;
    firm_name: string;
    pan: string;
    firm_email: string;
    address: string;
    country: string;
    state: string;
    city: string;
    membership_number: string;
    auditor_name: string;
    mobile: string;
    email: string;
    designation: string;
    certificate_of_practice?: string;
    letterhead_type?: "standard" | "custom";
}
