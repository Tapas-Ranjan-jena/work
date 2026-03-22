import { useOutletContext } from "react-router-dom"
import type { MonthRow } from "./incomeExpenseData"

export default function IncomeExpenseSummary() {

  const { data, setData, summary } = useOutletContext<{
    data: MonthRow[]
    setData: React.Dispatch<React.SetStateAction<MonthRow[]>>
    summary: { income: number, expenses: number, netProfit: number }
    isLoading: boolean
  }>()

  const updateValue = (index: number, field: "income" | "expense", value: number) => {
    const updated = [...data]
    updated[index][field] = value
    setData(updated)
  }

  return (
    <div className="p-3">

      {/* TOTALS SUMMARY */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 bg-light p-3 shadow-sm">
            <div className="text-muted small mb-1">Total Income</div>
            <div className="h4 m-0 fw-bold text-success">₹ {summary.income.toLocaleString()}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-light p-3 shadow-sm">
            <div className="text-muted small mb-1">Total Expenses</div>
            <div className="h4 m-0 fw-bold text-danger">₹ {summary.expenses.toLocaleString()}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-light p-3 shadow-sm">
            <div className="text-muted small mb-1">Net Profit</div>
            <div className="h4 m-0 fw-bold text-primary">₹ {summary.netProfit.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* CONTROL ROW */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

        <div className="d-flex gap-2">
          <select className="form-select form-select-sm" style={{ width: 80 }}>
            <option>100</option>
          </select>

          <button className="btn btn-light btn-sm border">
            <i className="bi bi-eye-slash"></i>
          </button>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-light btn-sm border">2026</button>
          <button className="btn btn-light btn-sm border">Excel</button>
          <button className="btn btn-light btn-sm border">Print</button>

          <div className="input-group input-group-sm" style={{ width: 200 }}>
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input className="form-control" placeholder="Search" />
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-responsive border rounded">

        <table className="table table-sm table-bordered align-middle mb-0">

          <thead style={{ background: "#f4f5f7" }}>
            <tr>
              <th>Month</th>
              <th>Income</th>
              <th>Expenses</th>
              <th>Profit</th>
            </tr>
          </thead>

          <tbody>

            {data.map((row, i) => {

              const profit = row.income - row.expense

              return (
                <tr key={row.month}>
                  <td>{row.month}</td>

                  <td>
                    <input
                      type="number"
                      value={row.income}
                      className="form-control form-control-sm"
                      onChange={(e) => updateValue(i, "income", Number(e.target.value))}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={row.expense}
                      className="form-control form-control-sm"
                      onChange={(e) => updateValue(i, "expense", Number(e.target.value))}
                    />
                  </td>

                  <td className="fw-semibold">
                    INR {profit.toFixed(2)}
                  </td>
                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}