import { useState, useEffect, useCallback } from "react"
import { useOutletContext } from "react-router-dom"
import timesheetService from "../../../../../services/timesheetService"
import type { TimesheetSummary as ITimesheetSummary } from "../../../../../services/timesheetTypes"
import toast from "react-hot-toast"

export default function TimesheetSummary() {
    const { filters, refreshKey } = useOutletContext<{ filters: any; refreshKey: number }>()
    const [reports, setReports] = useState<ITimesheetSummary[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReports = useCallback(async () => {
        setLoading(true)
        try {
            const res = await timesheetService.getSummary(filters.fromDate, filters.toDate)
            if (res.success) {
                setReports(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch timesheet report", error)
            toast.error("Failed to load summary report")
        } finally {
            setLoading(false)
        }
    }, [filters.fromDate, filters.toDate, refreshKey])

    useEffect(() => {
        fetchReports()
    }, [fetchReports])

    return (
        <div>
            {/* Summary Table */}
            <div className="table-responsive border rounded bg-white shadow-sm">
                <table className="table table-sm table-hover align-middle mb-0" style={{ fontSize: 13 }}>
                    <thead style={{ background: "#f8f9fa" }} className="border-bottom">
                        <tr>
                            <th className="ps-3 py-2">Member Name</th>
                            <th className="py-2">Tasks Worked</th>
                            <th className="py-2 text-center">Total Duration</th>
                            <th className="py-2 text-center">Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">
                                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                    Loading summary reports...
                                </td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center text-muted py-5">
                                    <i className="bi bi-bar-chart-line d-block mb-2 fs-3 opacity-25"></i>
                                    No summary data found for the selected period.
                                </td>
                            </tr>
                        ) : (
                            reports.map((report, index) => (
                                <tr key={index}>
                                    <td className="ps-3 fw-medium">{report.first_name} {report.last_name}</td>
                                    <td>
                                        <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-2">
                                            {report.tasks_worked || 0} Tasks
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {Math.floor((report.total_minutes || 0) / 60)}h {(report.total_minutes || 0) % 60}m
                                    </td>
                                    <td className="text-center fw-semibold">
                                        {((report.total_minutes || 0) / 60).toFixed(2)} hrs
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted px-1">
                <span>Total Members: {reports.length}</span>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-light border" disabled>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-light border" disabled>
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
