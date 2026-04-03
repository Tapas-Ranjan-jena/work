import api from "../api/api";

const dashboardService = {
    /** GET DASHBOARD STATS */
    getStats: async () => {
        try {
            // Using a root-relative path if possible, or adjusting prefix
            const response = await api.get("/dashboard/stats", { baseURL: "http://13.126.81.144:3000/api" });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET PAYMENT OVERVIEW */
    getPayments: async () => {
        try {
            const response = await api.get("/dashboard/payments", { baseURL: "http://13.126.81.144:3000/api" });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET INCOME VS EXPENSES */
    getIncomeExpense: async () => {
        try {
            const response = await api.get("/dashboard/income-expense", { baseURL: "http://13.126.81.144:3000/api" });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET FINANCIAL BREAKDOWN */
    getFinanceBreakdown: async () => {
        try {
            const response = await api.get("/dashboard/finance-breakdown", { baseURL: "http://13.126.81.144:3000/api" });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET NEW UPDATES */
    getUpdates: async (limit: number = 5) => {
        try {
            const response = await api.get(`/updates?limit=${limit}`, { baseURL: "http://13.126.81.144:3000/api" });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default dashboardService;
