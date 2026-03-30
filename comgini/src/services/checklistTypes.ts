export interface ChecklistItem {
    siNo: number;
    particular: string;
}

export interface Checklist {
    id: number;
    title: string;
    items: ChecklistItem[] | string; // Sometimes items might be stringified JSON from backend
    created_by: number;
    created_by_name?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateChecklistRequest {
    title: string;
    items: ChecklistItem[];
}

export interface PaginatedChecklistResponse {
    success: boolean;
    data: Checklist[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
    };
}
