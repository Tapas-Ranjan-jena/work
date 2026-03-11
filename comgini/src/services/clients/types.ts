export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface ClientContact {
    id: number;
    client_id: number;
    name: string;
    designation: string;
    email: string;
    phone: string;
    is_primary: 0 | 1;
    created_at: string;
    updated_at?: string;
}

export interface Client {
    id: number;
    name: string; // Used for Company Name
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    address?: string;
    website?: string;
    cin?: string;
    skype?: string;
    jobTitle?: string;
    gender?: string;
    status: 'active' | 'inactive';
    contacts: ClientContact[];
    createdAt: string;
    updatedAt: string;
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

export interface CreateClientRequest {
    name: string;
    email: string;
    phone: string;
    company_name: string;
    cin: string;
    pan: string;
    gstin: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    client_group: string;
    risk_score: string;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> { }

export interface CreateContactRequest {
    name: string;
    designation: string;
    email: string;
    phone: string;
    is_primary: boolean;
}

export interface CreateClientPortalUserRequest {
    clientId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    skype: string;
    jobTitle: string;
    gender: "male" | "female";
    password: string;
}
