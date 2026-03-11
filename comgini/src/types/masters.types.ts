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
