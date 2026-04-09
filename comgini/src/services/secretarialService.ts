import { apiRequest } from "../api/api";

export interface FilingPayload {
    company_id: number;
    financial_year: string;
    form_type: string;
    status: string;
    due_date?: string;
    filing_date?: string;
    agm_date?: string;
    receipt_date?: string;
    srn?: string;
    remarks?: string;
}

export interface ReminderPayload {
    company_id: number;
    compliance_type: string;
    due_date: string;
    reminder_date: string;
    email_recipients: string;
    email_subject: string;
    email_body: string;
    send_whatsapp: boolean;
}

export interface DSCPayload {
    holder_name: string;
    din: string;
    company_id: number;
    client_group: string;
    token_serial: string;
    provider: string;
    issue_date: string;
    expiry_date: string;
    box_location: string;
}

export interface DSCBoxPayload {
    name: string;
    location?: string;
    capacity?: number;
}

export interface SearchReportPayload {
    entity_type: string;
    date_of_search: string;
    srn_mca_search: string;
    signed_by: string;
    udin?: string;
    date_of_signing: string;
    place_of_signing: string;
    cin: string;
    company_name: string;
    registered_office: string;
    registration_number?: string;
    authorized_capital?: number;
    paid_up_capital?: number;
    date_of_incorporation?: string;
    date_of_last_agm?: string;
    date_of_last_balance_sheet?: string;
    signatories: any[];
    shareholders: any[];
    charges: any[];
}

export interface CSRCalculationPayload {
    company_id: number;
    financial_year: string;
    computation_data: any; // Complex financial grid data
}

export interface DIR3KYCPayload {
    din: string;
    pan: string;
    is_kyc_done: boolean;
    status: string;
    remarks?: string;
}

export interface MCACredentialsPayload {
    target_id: number;
    target_type: string;
    user_id: string;
    password: string;
    v3_user_id?: string;
    v3_password?: string;
    last_updated?: string;
}

export interface ComplianceReminderPayload {
    compliance_id: number;
    company_id: number;
    reminder_date: string;
    reminder_slot: string;
    emails: string[];
    subject: string;
    description: string;
}

const secretarialService = {
    /** GET FILING STATUS */
    getFilings: async (params?: { company_id?: number; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.company_id) queryParams.append("company_id", params.company_id.toString());
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/secretarial/filings${queryString}`);
    },

    /** CREATE FILING STATUS */
    createFiling: async (payload: FilingPayload) => {
        return apiRequest("/secretarial/filings", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** BULK UPDATE FILINGS */
    bulkUpdateFilings: async (updates: { id: number; status: string }[]) => {
        return apiRequest("/secretarial/filings/bulk-update", {
            method: "PUT",
            body: JSON.stringify({ updates })
        });
    },

    /** GET COMPLIANCE REMINDERS */
    getReminders: async (companyId?: number) => {
        const query = companyId ? `?company_id=${companyId}` : "";
        return apiRequest(`/secretarial/reminders${query}`);
    },

    /** CREATE REMINDER */
    createReminder: async (payload: ReminderPayload) => {
        return apiRequest("/secretarial/reminders", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** GET DSC TOKENS */
    getDscTokens: async () => {
        return apiRequest("/secretarial/dsc");
    },

    /** CREATE DSC TOKEN */
    createDscToken: async (payload: DSCPayload) => {
        return apiRequest("/secretarial/dsc", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** TOGGLE DSC STATUS (IN/OUT) */
    toggleDscStatus: async (id: number, status: string, checkedOutTo?: string) => {
        return apiRequest(`/secretarial/dsc/${id}/toggle`, {
            method: "PUT",
            body: JSON.stringify({ current_status: status, checked_out_to: checkedOutTo })
        });
    },

    /** GET DSC BOXES */
    getDscBoxes: async () => {
        return apiRequest("/secretarial/dsc-boxes");
    },

    /** CREATE DSC BOX */
    createDscBox: async (payload: DSCBoxPayload) => {
        return apiRequest("/secretarial/dsc-boxes", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** GET DIRECTOR TENURES */
    getDirectorTenures: async (companyId?: number) => {
        const url = companyId ? `/secretarial/director-tenures?company_id=${companyId}` : "/secretarial/director-tenures";
        return apiRequest(url);
    },

    /** GET SEARCH REPORTS */
    getSearchReports: async (params?: { type?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.type) queryParams.append("type", params.type);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/secretarial/search-reports${queryString}`);
    },

    /** CREATE SEARCH REPORT (FULL) */
    createSearchReport: async (payload: SearchReportPayload | { companyId: string | number; type: string; srn: string }) => {
        return apiRequest("/secretarial/search-reports", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },


    /** GET FORMS / DIR-2 LIST */
    getForms: async (params?: { search?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/forms${queryString}`);
    },

    /** CREATE DIR-2 */
    createDir2: async (payload: { din: string; name: string; pan: string }) => {
        return apiRequest("/dir2", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },


    /** GET CSR CALCULATIONS */
    getCSRCalculations: async (params?: { page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/secretarial/csr-calculations${queryString}`);
    },

    /** CREATE CSR CALCULATION */
    createCSRCalculation: async (payload: CSRCalculationPayload) => {
        return apiRequest("/secretarial/csr-calculations", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** POST DIR3 KYC */
    postDir3Kyc: async (payload: DIR3KYCPayload) => {
        return apiRequest("/dir3-kyc", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** GET DIR3 KYC LIST */
    getDir3KycList: async (params?: { page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/dir3-kyc${queryString}`);
    },

    /** CREATE MCA CREDENTIALS */
    createMcaCredentials: async (payload: MCACredentialsPayload) => {
        return apiRequest("/secretarial/mca-credentials", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** UPDATE MCA CREDENTIALS */
    updateMcaCredentials: async (payload: MCACredentialsPayload) => {
        return apiRequest("/secretarial/mca-credentials", {
            method: "PATCH",
            body: JSON.stringify(payload)
        });
    },

    /** CREATE COMPLIANCE REMINDER (NEW PATH) */
    createComplianceReminder: async (payload: ComplianceReminderPayload) => {
        return apiRequest("/secretarial/compliances/reminders", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    /** GET MCA TRANSACTIONS */
    getMcaTransactions: async (params?: { page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/secretarial/mca-transactions${queryString}`);
    },

    /** GET MCA V2 USERS */
    getMcaV2Users: async () => {
        return apiRequest('/mca/v2/users');
    },

    /** CREATE MCA V3 ACCOUNT */
    createMcaV3Account: async (payload: any) => {
        return apiRequest('/mca/v3/accounts', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    /** FETCH MCA V2 TRANSACTIONS */
    fetchMcaV2Transactions: async (payload: { userId: number; fromDate: string; toDate: string }) => {
        return apiRequest('/mca/v2/transactions/fetch', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },


    /** GET ANNUAL FILING LIST */
    getAnnualFilingList: async (params?: { search?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/annual-filing${queryString}`);
    },

    /** CHECK ANNUAL FILING STATUS */
    checkAnnualFilingStatus: async (payload: { mcaUser: string; companyId: string; cin: string }) => {
        return apiRequest('/annual-filing/status', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    /** GET LLP CREDENTIALS */
    getLlpCredentials: async (params?: { search?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/llp/credentials${queryString}`);
    },

    /** CREATE LLP CREDENTIALS */
    createLlpCredentials: async (payload: any) => {
        return apiRequest('/llp/credentials', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },

    /** GET COMPANY CREDENTIALS */
    getCompanyCredentials: async (params?: { search?: string; page?: number; limit?: number }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/company/credentials${queryString}`);
    },

    /** CREATE COMPANY CREDENTIALS */
    createCompanyCredentials: async (payload: any) => {
        return apiRequest('/company/credentials', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
};

export default secretarialService;
