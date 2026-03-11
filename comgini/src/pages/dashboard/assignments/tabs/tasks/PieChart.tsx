export default function PieChart() {
    return (
        <div className="row g-3">

            {/* Pie Chart Placeholder */}
            <div className="col-md-6">
                <div className="card border">
                    <div className="card-body text-center">
                        <h6 className="fw-semibold mb-3">Tasks by Status</h6>
                        {/* Pie chart renders here */}
                        <div
                            className="d-flex align-items-center justify-content-center text-muted"
                            style={{ height: 200 }}
                        >
                            <i className="bi bi-pie-chart fs-1 me-2"></i>
                            <span className="small">Chart renders here</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend / Summary */}
            <div className="col-md-6">
                <div className="card border">
                    <div className="card-body">
                        <h6 className="fw-semibold mb-3">Summary</h6>
                        <ul className="list-group list-group-flush small">
                            <li className="list-group-item d-flex justify-content-between px-0">
                                <span><span className="badge bg-secondary me-2">●</span> To Do</span>
                                <strong>0</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between px-0">
                                <span><span className="badge bg-primary me-2">●</span> In Progress</span>
                                <strong>0</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between px-0">
                                <span><span className="badge bg-success me-2">●</span> Completed</span>
                                <strong>0</strong>
                            </li>
                            <li className="list-group-item d-flex justify-content-between px-0">
                                <span><span className="badge bg-danger me-2">●</span> Cancelled</span>
                                <strong>0</strong>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
