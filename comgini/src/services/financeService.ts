import api from '../api/api';
import type { ApiResponse, PaginatedResponse } from '../types/masters.types';
import type {
    Invoice,
    CreateInvoiceRequest,
    UpdateInvoicePaymentRequest,
    Expense,
    CreateExpenseRequest,
    ProfitLossReport
} from '../types/finance.types';

const financeService = {
    // --- Invoices ---
    async getInvoices(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Invoice>> {
        const response = await api.get<ApiResponse<Invoice[]>>('/finance/invoices', {
            params: { page, limit }
        });
        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    async createInvoice(data: CreateInvoiceRequest): Promise<Invoice> {
        const response = await api.post<ApiResponse<Invoice>>('/finance/invoices', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create invoice');
        return response.data.data!;
    },

    async getInvoiceById(id: number): Promise<Invoice> {
        const response = await api.get<ApiResponse<Invoice>>(`/finance/invoices/${id}`);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to fetch invoice');
        return response.data.data!;
    },

    async updateInvoicePayment(id: number, data: UpdateInvoicePaymentRequest): Promise<Invoice> {
        const response = await api.put<ApiResponse<Invoice>>(`/finance/invoices/${id}`, data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to update invoice payment');
        return response.data.data!;
    },

    // --- Expenses ---
    async getExpenses(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Expense>> {
        const response = await api.get<ApiResponse<Expense[]>>('/finance/expenses', {
            params: { page, limit }
        });
        return {
            data: response.data.data || [],
            pagination: (response.data as any).pagination || { page, limit, total: (response.data.data || []).length }
        };
    },

    async createExpense(data: CreateExpenseRequest): Promise<Expense> {
        const response = await api.post<ApiResponse<Expense>>('/finance/expenses', data);
        if (!response.data.success) throw new Error(response.data.message || 'Failed to create expense');
        return response.data.data!;
    },

    // --- Profit / Loss ---
    async getProfitLoss(): Promise<ProfitLossReport> {
        const response = await api.get<ApiResponse<ProfitLossReport>>('/finance/profit-loss');
        if (!response.data.success) throw new Error(response.data.message || 'Failed to fetch profit/loss report');
        return response.data.data!;
    },

    // --- Analytics / Charts ---
    async getFinanceChart(year: number): Promise<any[]> {
        const response = await api.get('/finance/chart', { params: { year } });
        return response.data.data || [];
    },

    async getFinanceSummary(year: number): Promise<any> {
        const response = await api.get('/finance/summary', { params: { year } });
        return response.data.data || {};
    },

    async getFinanceMonthly(year: number): Promise<any[]> {
        const response = await api.get('/finance/monthly', { params: { year } });
        return response.data.data || [];
    }
};

export default financeService;
