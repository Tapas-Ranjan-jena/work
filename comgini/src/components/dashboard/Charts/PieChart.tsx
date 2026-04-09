import React from "react";
import { PieChart as RPChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface FinanceData {
    category: string;
    value: number;
}

interface PieChartProps {
    data: FinanceData[];
}

const COLORS = ["#3f51b5", "#f44336", "#ff9800", "#4caf50", "#9c27b0"];

const PieChart: React.FC<PieChartProps> = ({ data }) => {
    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="h-100 d-flex flex-column">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-pie-chart text-primary" style={{ fontSize: '18px' }}></i> Financial Management
            </h5>
            <div style={{ width: "100%", height: 300, position: "relative" }}>
                <ResponsiveContainer>
                    <RPChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend iconType="square" align="center" verticalAlign="bottom" layout="horizontal" iconSize={8} wrapperStyle={{ fontSize: "10px", fontWeight: "600" }} />
                    </RPChart>
                </ResponsiveContainer>
                <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                    <div className="small text-muted fw-bold">Total Expenses:</div>
                    <div className="fw-bold h4 mb-0">₹{(totalValue/1000).toFixed(0)}k</div>
                </div>
            </div>
        </div>
    );
};

export default PieChart;
