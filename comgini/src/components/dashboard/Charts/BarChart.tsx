import React from "react";
import { BarChart as RBChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartItem {
    label: string;
    amount: number;
}

interface BarChartProps {
    monthlyData: ChartItem[];
    yearlyData: ChartItem[];
    dailyData: ChartItem[];
}

const BarChart: React.FC<BarChartProps> = ({ monthlyData, yearlyData, dailyData }) => {
    const [view, setView] = React.useState<"Daily" | "Monthly" | "Yearly">("Monthly");

    const activeData = view === "Daily" ? dailyData : view === "Yearly" ? yearlyData : monthlyData;
    const dataKey = "label";

    return (
        <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-bar-chart text-primary"></i> Payment Overview
                </h5>
                <select 
                    className="form-select form-select-sm border-0 bg-light w-auto fw-semibold cursor-pointer" 
                    style={{ fontSize: "12px" }}
                    value={view}
                    onChange={(e) => setView(e.target.value as any)}
                >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>
            <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                    <RBChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                        <XAxis 
                            dataKey={dataKey} 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: "#888" }} 
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 10, fill: "#888" }}
                            tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                        />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#36a2eb" radius={[4, 4, 0, 0]} barSize={25} />
                    </RBChart>
                </ResponsiveContainer>
            </div>
            <div className="text-center mt-3">
                <span className="small text-muted fw-bold"> 
                    <span className="rounded-circle d-inline-block me-1" style={{ width: 8, height: 8, backgroundColor: "#36a2eb" }}></span> 
                    {view === "Yearly" ? "2020 - 2026" : "2026"}
                </span>
            </div>
        </div>
    );
};

export default BarChart;
