interface KanbanColumnProps {
    title: string;
    color: string;
}

export default function KanbanColumn({ title, color }: KanbanColumnProps) {
    return (
        <div className="kanban-column" style={{ minWidth: "250px", flex: "0 0 250px" }}>
            {/* ⭐ COLUMN HEADER */}
            <div
                className="rounded-3 px-3 py-2 text-white mb-3 shadow-sm d-flex align-items-center"
                style={{
                    backgroundColor: color,
                    height: "45px",
                    fontSize: "14px",
                    fontWeight: "500"
                }}
            >
                {title} (0)
            </div>

            {/* ⭐ COLUMN BODY */}
            <div className="rounded-3 p-2" style={{ minHeight: "200px" }}>
                {/* Empty state for now */}
            </div>
        </div>
    );
}