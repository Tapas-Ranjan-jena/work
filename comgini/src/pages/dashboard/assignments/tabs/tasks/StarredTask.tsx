export default function StarredTask() {
    return (
        <div className="table-responsive border rounded">
            <table className="table table-sm table-bordered align-middle mb-0">
                <thead style={{ background: "#f4f5f7" }}>
                    <tr>
                        <th style={{ width: 40 }}>
                            <i className="bi bi-star-fill text-warning"></i>
                        </th>
                        <th>Task</th>
                        <th>Assignee</th>
                        <th>Client</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th style={{ width: 40 }}>
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Starred task rows render here */}
                </tbody>
            </table>
        </div>
    )
}
