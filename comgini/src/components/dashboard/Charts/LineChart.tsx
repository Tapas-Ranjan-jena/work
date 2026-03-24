import React from "react";
import { LineChart as RLChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface IncomeExpenseData {
    month: string;
    income: number;
    expense: number;
}

interface LineChartProps {
    data: IncomeExpenseData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
    return (
        <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: "16px" }}>
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-graph-up text-primary"></i> Income vs Expenses
            </h5>
            <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                    <RLChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: "#888" }} 
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: "#888" }}
                        />
                        <Tooltip />
                        <Legend verticalAlign="top" align="right" iconType="circle" />
                        <Line type="monotone" dataKey="income" stroke="#4bc0c0" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="expense" stroke="#ff6384" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </RLChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LineChart;
