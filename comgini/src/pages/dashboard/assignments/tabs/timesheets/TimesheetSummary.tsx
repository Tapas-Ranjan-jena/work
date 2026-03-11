import { useState, useEffect } from "react"
import tasksService from "../../../../../services/tasksService"

export default function TimesheetSummary() {
    const [reports, setReports] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReports = async () => {
        try {
            setLoading(true)
            const res = await tasksService.getTimesheetsReport()
            // Depending on response structure, it could be an array directly or inside data array
            if (Array.isArray(res)) setReports(res)
            else if (res.data && Array.isArray(res.data)) setReports(res.data)
            else if (res.success && res.data) setReports(Array.isArray(res.data) ? res.data : [res.data])
        } catch (error) {
            console.error("Failed to fetch timesheet report", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReports()
    }, [])

    return (
        <div>
            {/* Summary Table */}
            <div className="table-responsive border rounded">
                <table className="table table-sm table-bordered align-middle mb-0" style={{ fontSize: 13 }}>
                    <thead style={{ background: "#f4f5f7" }}>
                        <tr>
                            <th style={{ whiteSpace: "nowrap" }}>Assignment</th>
                            <th style={{ whiteSpace: "nowrap" }}>Client</th>
                            <th style={{ whiteSpace: "nowrap" }}>Member</th>
                            <th style={{ whiteSpace: "nowrap" }}>Task</th>
                            <th style={{ whiteSpace: "nowrap" }}>Duration</th>
                            <th style={{ whiteSpace: "nowrap" }}>Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center text-muted py-4">Loading reports...</td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center text-muted py-4">No record found.</td>
                            </tr>
                        ) : (
                            reports.map((report, index) => (
                                <tr key={index}>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>{report.first_name} {report.last_name}</td>
                                    <td>{report.tasks_worked || 0}</td>
                                    <td>{report.total_minutes || 0} min</td>
                                    <td>{((report.total_minutes || 0) / 60).toFixed(2)} hrs</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
                <span>0-0 / 0</span>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-light border">
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-light border">
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
