import React from "react";

interface TaskFiltersProps {
    filters: any;
    onSearch: (term: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ filters, onSearch }) => {
    // Note: setFilters is planned for advanced filtering logic
    console.log("Current filters:", filters);
    return (
        <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
            {/* Rows Per Page */}
            <div style={{ width: "80px" }}>
                <select className="form-select border shadow-none bg-white py-2" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>100</option>
                </select>
            </div>
            
            {/* Visibility Toggle */}
            <button className="btn btn-outline-secondary border shadow-none bg-white py-2 px-3" style={{ borderRadius: "8px" }}>
                <i className="bi bi-eye-slash"></i>
            </button>

            {/* Client Filter */}
            <div style={{ width: "150px" }}>
                <select className="form-select border shadow-none bg-white py-2 text-muted" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>- Client -</option>
                </select>
            </div>

            {/* Assignment Filter */}
            <div style={{ width: "170px" }}>
                <select className="form-select border shadow-none bg-white py-2 text-muted" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>- Assignment -</option>
                </select>
            </div>

            {/* Staff Filter */}
            <div style={{ width: "180px" }}>
                <select className="form-select border shadow-none bg-white py-2" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>Sakshi Rawat</option>
                </select>
            </div>

            {/* Date Filters */}
            <div style={{ width: "180px" }}>
                <input type="text" className="form-control border shadow-none bg-white py-2 text-muted" placeholder="8th February 2026" style={{ borderRadius: "8px", fontSize: "0.85rem" }} />
            </div>
            <div style={{ width: "180px" }}>
                <input type="text" className="form-control border shadow-none bg-white py-2 text-muted" placeholder="23rd February 2026" style={{ borderRadius: "8px", fontSize: "0.85rem" }} />
            </div>

            {/* Deadline Filter */}
            <div style={{ width: "130px" }}>
                <select className="form-select border shadow-none bg-white py-2 text-muted" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>- Deadline -</option>
                </select>
            </div>

            {/* Status Filter */}
            <div style={{ width: "130px" }}>
                <select className="form-select border shadow-none bg-white py-2 text-muted" style={{ borderRadius: "8px", fontSize: "0.85rem" }}>
                    <option>-Status -</option>
                </select>
            </div>

            {/* Utility Buttons */}
            <button className="btn btn-light border shadow-none py-2 px-3" style={{ borderRadius: "8px", fontSize: "0.85rem", background: "#f8f9fa" }}>Excel</button>
            <button className="btn btn-light border shadow-none py-2 px-3" style={{ borderRadius: "8px", fontSize: "0.85rem", background: "#f8f9fa" }}>Print</button>

            {/* Search */}
            <div className="input-group flex-grow-1" style={{ maxWidth: "250px" }}>
                <input 
                    type="text" 
                    className="form-control border-end-0 shadow-none py-2" 
                    placeholder="Search" 
                    style={{ borderRadius: "8px 0 0 8px", fontSize: "0.85rem" }}
                    onChange={(e) => onSearch(e.target.value)}
                />
                <span className="input-group-text bg-white border border-start-0 py-2 px-3" style={{ borderRadius: "0 8px 8px 0" }}>
                    <i className="bi bi-search text-muted" style={{ fontSize: "0.9rem" }}></i>
                </span>
            </div>
        </div>
    );
};

export default TaskFilters;
