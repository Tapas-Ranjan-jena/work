import api from "../api/api";

const dashboardService = {
    /** GET DASHBOARD STATS */
    getStats: async () => {
        try {
            const response = await api.get("/dashboard/stats");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET PAYMENT OVERVIEW */
    getPayments: async () => {
        try {
            const response = await api.get("/dashboard/payments");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET INCOME VS EXPENSES */
    getIncomeExpense: async () => {
        try {
            const response = await api.get("/dashboard/income-expense");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET FINANCIAL BREAKDOWN */
    getFinanceBreakdown: async () => {
        try {
            const response = await api.get("/dashboard/finance-breakdown");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    /** GET NEW UPDATES */
    getUpdates: async (limit: number = 5) => {
        try {
            const response = await api.get(`/updates?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default dashboardService;
