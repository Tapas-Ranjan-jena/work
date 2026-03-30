import { useState, useEffect, useCallback } from "react"
import { useOutletContext } from "react-router-dom"
import timesheetService from "../../../../../services/timesheetService"
import type { Timesheet } from "../../../../../services/timesheetTypes"
import toast from "react-hot-toast"

export default function TimesheetDetails() {
    const { filters, refreshKey } = useOutletContext<{ filters: any; refreshKey: number }>()
    const [timesheets, setTimesheets] = useState<Timesheet[]>([])
    const [loading, setLoading] = useState(true)

    const fetchTimesheets = useCallback(async () => {
        setLoading(true)
        try {
            const res = await timesheetService.getTimesheets(filters.fromDate, filters.toDate)
            if (res.success) {
                setTimesheets(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch timesheets", error)
            toast.error("Failed to load timesheet data")
        } finally {
            setLoading(false)
        }
    }, [filters.fromDate, filters.toDate, refreshKey])

    useEffect(() => {
        fetchTimesheets()
    }, [fetchTimesheets])

    return (
        <div>
            <div className="table-responsive border rounded bg-white shadow-sm">
                <table className="table table-sm table-hover align-middle mb-0" style={{ fontSize: 13 }}>
                    <thead style={{ background: "#f8f9fa" }} className="border-bottom">
                        <tr>
                            <th className="ps-3 py-2">Member</th>
                            <th className="py-2">Client</th>
                            <th className="py-2">Task / Purpose</th>
                            <th className="py-2">Start Time</th>
                            <th className="py-2">End Time</th>
                            <th className="py-2">Total</th>
                            <th className="py-2 text-center" style={{ width: 60 }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4">
                                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                    Loading timesheets...
                                </td>
                            </tr>
                        ) : timesheets.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-muted py-5">
                                    <i className="bi bi-calendar-x d-block mb-2 fs-3 opacity-25"></i>
                                    No records found for the selected period.
                                </td>
                            </tr>
                        ) : (
                            timesheets.map((item) => (
                                <tr key={item.id}>
                                    <td className="ps-3 fw-medium">{item.member_name}</td>
                                    <td>{item.client_name}</td>
                                    <td>
                                        <div className="text-truncate" style={{ maxWidth: 200 }} title={item.task}>
                                            {item.task}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small">{new Date(item.start_date).toLocaleDateString()}</div>
                                        <div className="text-muted" style={{ fontSize: 11 }}>{item.start_time}</div>
                                    </td>
                                    <td>
                                        <div className="small">{new Date(item.end_date).toLocaleDateString()}</div>
                                        <div className="text-muted" style={{ fontSize: 11 }}>{item.end_time}</div>
                                    </td>
                                    <td>
                                        <span className="badge bg-light text-dark fw-normal border">
                                            {Math.floor(item.total_minutes / 60)}h {item.total_minutes % 60}m
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-link p-0 text-primary">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted px-1">
                <span>Showing {timesheets.length} records</span>
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
