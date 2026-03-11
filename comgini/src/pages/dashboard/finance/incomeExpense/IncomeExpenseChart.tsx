import { useOutletContext } from "react-router-dom"
import type { MonthRow } from "./incomeExpenseData"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

export default function IncomeExpenseChart() {

  const { data } = useOutletContext<{ data: MonthRow[] }>()

  return (
    <div className="p-3">

      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="small fw-semibold">
          <i className="bi bi-bar-chart me-2"></i>Chart
        </div>

        <div className="btn-group btn-group-sm">
          <button className="btn btn-light border">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="btn btn-light border">2026</button>
          <button className="btn btn-light border">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* ⭐ RESPONSIVE CHART */}
      <div style={{ height: 350 }}>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid stroke="#e9ecef" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="income" stroke="#22c55e" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
}