import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { defaultIncomeExpense } from "./incomeExpenseData"
import type { MonthRow } from "./incomeExpenseData"
import financeService from "../../../../services/financeService"

export default function IncomeExpenseLayout() {
  const [data, setData] = useState<MonthRow[]>(defaultIncomeExpense)
  const [summary, setSummary] = useState({ income: 0, expenses: 0, netProfit: 0 })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProfitLoss = async () => {
      setIsLoading(true)
      try {
        const report = await financeService.getProfitLoss()
        if (report) {
          const breakdown = report.breakdown.map((item: any) => ({
            month: item.month.substring(0, 3), // e.g. "Jan"
            income: item.income,
            expense: item.expenses
          }))
          setData(breakdown)
          setSummary({
            income: report.income,
            expenses: report.expenses,
            netProfit: report.net_profit
          })
        }
      } catch (error) {
        console.error("Failed to fetch profit loss report:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfitLoss()
  }, [])

  return (
    <div>
      <h5 className="fw-bold mb-3 text-dark">Income vs Expenses</h5>

      <div className="card shadow-sm border-0">
        <div className="card-body pb-0 border-bottom">
          <div className="d-flex gap-4 small fw-semibold">
            <NavLink to="/finance/income-expense"
              end
              className={({ isActive }: { isActive: boolean }) =>
                `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
              }>
              Chart
            </NavLink>

            <NavLink to="/finance/income-expense/summary"
              className={({ isActive }: { isActive: boolean }) =>
                `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted"}`
              }>
              Summary
            </NavLink>
          </div>
        </div>

        <Outlet context={{ data, setData, summary, isLoading }} />
      </div>
    </div>
  )
}