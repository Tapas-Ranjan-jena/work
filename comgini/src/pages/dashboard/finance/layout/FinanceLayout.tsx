import { Outlet } from "react-router-dom"

export default function FinanceLayout() {
    return (
        <div className="finance-root-layout">
            <Outlet />
        </div>
    )
}
