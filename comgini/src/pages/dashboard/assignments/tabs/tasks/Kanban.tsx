export default function Kanban() {
    const columns = [
        { id: "todo", label: "To Do", color: "#6c757d" },
        { id: "inprogress", label: "In Progress", color: "#0d6efd" },
        { id: "completed", label: "Completed", color: "#198754" },
        { id: "cancelled", label: "Cancelled", color: "#dc3545" },
    ]

    return (
        <div className="d-flex gap-3 overflow-auto pb-2">
            {columns.map((col) => (
                <div
                    key={col.id}
                    className="flex-shrink-0 rounded border"
                    style={{ width: 260, background: "#f8f9fa" }}
                >
                    {/* Column Header */}
                    <div
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-top"
                        style={{ borderBottom: `3px solid ${col.color}` }}
                    >
                        <span className="fw-semibold small" style={{ color: col.color }}>
                            {col.label}
                        </span>
                        <span className="badge rounded-pill text-bg-secondary ms-auto">0</span>
                    </div>

                    {/* Cards Area */}
                    <div className="p-2 d-flex flex-column gap-2" style={{ minHeight: 300 }}>
                        {/* Task cards render here */}
                    </div>
                </div>
            ))}
        </div>
    )
}
