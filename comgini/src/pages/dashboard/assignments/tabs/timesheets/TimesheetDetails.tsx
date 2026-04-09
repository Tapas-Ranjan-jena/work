import { useState, useEffect, useCallback } from "react"
import { useOutletContext } from "react-router-dom"
import timesheetService from "../../../../../services/timesheetService"
import type { Timesheet } from "../../../../../services/timesheetTypes"
import toast from "react-hot-toast"

export default function TimesheetDetails() {
    const { filters, refreshKey } = useOutletContext<{ filters: any; refreshKey: number }>()
    const [timesheets, setTimesheets] = useState<Timesheet[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)

    const fetchTimesheets = useCallback(async () => {
        setLoading(true)
        try {
            const res = await timesheetService.getTimesheets({
                fromDate: filters.fromDate, 
                toDate: filters.toDate,
                page: page,
                limit: 10
            })
            if (res && res.success && res.data) {
                setTimesheets(res.data.timesheets || [])
                setTotalRecords(res.data.total || 0)
            } else {
                setTimesheets([])
            }
        } catch (error) {
            console.error("Failed to fetch timesheets", error)
            setTimesheets([])
            toast.error("Failed to load timesheet data")
        } finally {
            setLoading(false)
        }
    }, [filters.fromDate, filters.toDate, refreshKey, page])

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this timesheet?")) return;
        try {
            const res = await timesheetService.deleteTimesheet(id);
            if(res.success) {
                toast.success("Timesheet deleted successfully");
                fetchTimesheets();
            } else {
                toast.error(res.message || "Failed to delete timesheet");
            }
        } catch (err) {
            toast.error("An error occurred");
        }
    }

    useEffect(() => {
        fetchTimesheets()
    }, [fetchTimesheets])

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return { date: '-', time: '-' };
        try {
            // Strip out weird backend formatting like "GMT+0000 (Coordinated Universal Time)T10:00:00"
            let cleanStr = dateStr;
            let explicitTime = "";
            if (dateStr.includes(')T')) {
                const parts = dateStr.split(')T');
                cleanStr = parts[0] + ')';
                explicitTime = parts[1].substring(0, 5); // "10:00"
            }
            const d = new Date(cleanStr);
            if (isNaN(d.getTime())) return { date: 'Invalid Date', time: '-' };
            return {
                date: d.toLocaleDateString(),
                time: explicitTime || d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        } catch {
            return { date: 'Invalid Date', time: '-' };
        }
    }

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
                                    <td className="ps-3 fw-medium">{item.member || 'Unknown'}</td>
                                    <td>{item.client || 'Unknown'}</td>
                                    <td>
                                        <div className="text-truncate" style={{ maxWidth: 200 }} title={item.task}>
                                            {item.task || 'No Description'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small">{formatDateTime(item.start_time).date}</div>
                                        <div className="text-muted" style={{ fontSize: 11 }}>{formatDateTime(item.start_time).time}</div>
                                    </td>
                                    <td>
                                        <div className="small">{formatDateTime(item.end_time).date}</div>
                                        <div className="text-muted" style={{ fontSize: 11 }}>{formatDateTime(item.end_time).time}</div>
                                    </td>
                                    <td>
                                        <span className="badge bg-light text-dark fw-normal border">
                                            {item.total_hours !== null && item.total_hours !== undefined 
                                                ? `${Math.floor(item.total_hours)}h ${Math.round((item.total_hours % 1) * 60)}m` 
                                                : '-'}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <button className="btn btn-sm btn-link p-0 text-primary">
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-sm btn-link p-0 text-danger" onClick={() => handleDelete(item.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Placeholder */}
            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted px-1">
                <span>Showing {timesheets.length} of {totalRecords} records</span>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-light border" disabled={page === 1} onClick={() => setPage(page - 1)}>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-light border" disabled={timesheets.length < 10} onClick={() => setPage(page + 1)}>
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
