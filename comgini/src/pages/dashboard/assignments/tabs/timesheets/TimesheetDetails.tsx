export default function TimesheetDetails() {
    return (
        <div>
            <div className="table-responsive border rounded">
                <table className="table table-sm table-bordered align-middle mb-0" style={{ fontSize: 13 }}>
                    <thead style={{ background: "#f4f5f7" }}>
                        <tr>
                            <th style={{ whiteSpace: "nowrap" }}>
                                Member
                                <i className="bi bi-chevron-expand ms-1 text-muted" style={{ fontSize: 10 }}></i>
                            </th>
                            <th style={{ whiteSpace: "nowrap" }}>Assignment</th>
                            <th style={{ whiteSpace: "nowrap" }}>Client</th>
                            <th style={{ whiteSpace: "nowrap" }}>Task</th>
                            <th style={{ whiteSpace: "nowrap" }}>Start time</th>
                            <th style={{ whiteSpace: "nowrap" }}>End time</th>
                            <th style={{ whiteSpace: "nowrap" }}>Total</th>
                            <th style={{ width: 36, textAlign: "center" }}>
                                <i className="bi bi-camera"></i>
                            </th>
                            <th style={{ width: 36, textAlign: "center" }}>
                                <i className="bi bi-list"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td colSpan={9} className="text-center text-muted py-3">No record found.</td>
                        </tr>
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
