import { apiRequest } from "../api/api";

const bulkService = {
    getWhatsAppCampaigns: async (params?: { page?: number; limit?: number; search?: string }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/bulk/whatsapp/campaigns${queryString}`);
    },

    sendWhatsApp: async (payload: { message: string; contacts: string[] }) => {
        return apiRequest("/bulk/whatsapp/send", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    getGmailCampaigns: async (params?: { page?: number; limit?: number; search?: string }) => {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());
        if (params?.search) queryParams.append("search", params.search);
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
        return apiRequest(`/bulk/gmail/campaigns${queryString}`);
    },

    sendGmail: async (payload: { subject: string; body: string; emails: string[] }) => {
        return apiRequest("/bulk/gmail/send", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    },

    uploadWhatsAppExcel: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return apiRequest('/bulk/whatsapp/upload', {
            method: 'POST',
            body: formData,
            headers: {
                // Ensure browser sets boundary automatically for multipart/form-data
                'Content-Type': 'undefined' 
            }
        });
    }
};


export default bulkService;
