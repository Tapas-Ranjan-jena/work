export default function TaskSummaryReport() {
    return (
        <div>

            {/* Summary Cards */}
            <div className="row g-3 mb-3">
                {[
                    { label: "Total Tasks", value: 0, color: "primary" },
                    { label: "Completed", value: 0, color: "success" },
                    { label: "In Progress", value: 0, color: "warning" },
                    { label: "Cancelled", value: 0, color: "danger" },
                ].map((item) => (
                    <div key={item.label} className="col-6 col-md-3">
                        <div className={`card border-${item.color} text-center`}>
                            <div className="card-body py-3">
                                <div className={`fw-bold fs-4 text-${item.color}`}>{item.value}</div>
                                <div className="small text-muted">{item.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Table */}
            <div className="table-responsive border rounded">
                <table className="table table-sm table-bordered align-middle mb-0">
                    <thead style={{ background: "#f4f5f7" }}>
                        <tr>
                            <th>Staff</th>
                            <th>Total Tasks</th>
                            <th>Completed</th>
                            <th>In Progress</th>
                            <th>Cancelled</th>
                            <th>Completion %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Report rows render here */}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
