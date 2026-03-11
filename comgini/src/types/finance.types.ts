export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface Invoice {
    id: number;
    invoice_number: string;
    client_id: number;
    company_id: number;
    issue_date: string;
    due_date: string;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    notes?: string;
    payment_status?: "paid" | "unpaid";
    payment_date?: string;
    items?: InvoiceItem[];
}

export interface CreateInvoiceRequest {
    invoice_number: string;
    client_id: number;
    company_id: number;
    issue_date: string;
    due_date: string;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    notes: string;
    items: InvoiceItem[];
}

export interface UpdateInvoicePaymentRequest {
    payment_status: "paid" | "unpaid";
    payment_date: string;
}

export interface Expense {
    id: number;
    expense_date: string;
    amount: number;
    category: string;
    description: string;
    payment_mode: "upi" | "cash" | "bank";
    created_by?: string;
    attachments?: string[];
}

export interface CreateExpenseRequest {
    category: string;
    description: string;
    amount: number;
    expense_date: string;
    payment_mode: "upi" | "cash" | "bank";
}

export interface ProfitLossBreakdown {
    month: string;
    income: number;
    expenses: number;
}

export interface ProfitLossReport {
    income: number;
    expenses: number;
    net_profit: number;
    breakdown: ProfitLossBreakdown[];
}
