export default function CompletedTask() {
    return (
        <div className="table-responsive border rounded">
            <table className="table table-sm table-bordered align-middle mb-0">
                <thead style={{ background: "#f4f5f7" }}>
                    <tr>
                        <th style={{ width: 40 }}>
                            <input type="checkbox" />
                        </th>
                        <th>Task</th>
                        <th>Assignee</th>
                        <th>Client</th>
                        <th>Priority</th>
                        <th>Completed On</th>
                        <th style={{ width: 40 }}>
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Completed task rows render here */}
                </tbody>
            </table>
        </div>
    )
}
