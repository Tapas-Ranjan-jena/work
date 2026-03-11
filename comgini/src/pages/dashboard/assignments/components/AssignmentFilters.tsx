export default function AssignmentFilters() {
    return (
        <div className="d-flex align-items-center flex-wrap gap-2">

            {/* Rows per page */}
            <select className="form-select form-select-sm" style={{ width: 80 }}>
                <option>100</option>
                <option>50</option>
                <option>25</option>
            </select>

            {/* Assignee filter */}
            <select className="form-select form-select-sm" style={{ width: 140 }}>
                <option>- Assignee -</option>
            </select>

            {/* Priority filter */}
            <select className="form-select form-select-sm" style={{ width: 130 }}>
                <option>- Priority -</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            {/* Status filter */}
            <select className="form-select form-select-sm" style={{ width: 130 }}>
                <option>- Status -</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Cancelled</option>
            </select>

            {/* Search */}
            <div className="input-group input-group-sm" style={{ width: 200 }}>
                <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                </span>
                <input className="form-control" placeholder="Search tasks..." />
            </div>

        </div>
    )
}
