import React from "react";

const TaskFilterBar: React.FC = () => {
    return (
        <div className="d-flex flex-wrap gap-2 mb-4 align-items-center bg-white p-2 rounded shadow-sm border">
            <select className="form-select form-select-sm w-auto border-0 bg-light">
                <option>10</option>
                <option>20</option>
                <option>50</option>
            </select>
            <button className="btn btn-sm btn-light border-0">
                <i className="bi bi-eye-slash text-muted"></i>
            </button>
            <select className="form-select form-select-sm w-auto border-0 bg-light text-muted">
                <option>- Client -</option>
            </select>
            <select className="form-select form-select-sm w-auto border-0 bg-light text-muted">
                <option>- Assignment -</option>
            </select>
            <select className="form-select form-select-sm w-auto border-0 bg-light text-muted">
                <option>Member Name</option>
            </select>
            <div className="d-flex align-items-center gap-1 border rounded px-2 py-1 bg-light">
                <span className="small text-muted">8th Feb 2026</span>
            </div>
            <div className="d-flex align-items-center gap-1 border rounded px-2 py-1 bg-light">
                <span className="small text-muted">23rd Feb 2026</span>
            </div>
            <select className="form-select form-select-sm w-auto border-0 bg-light text-muted">
                <option>- Deadline -</option>
            </select>
            <select className="form-select form-select-sm w-auto border-0 bg-light text-muted">
                <option>- Status -</option>
            </select>
            <div className="ms-auto d-flex gap-2">
                <button className="btn btn-sm btn-outline-secondary border-0 bg-light fw-medium">Excel</button>
                <button className="btn btn-sm btn-outline-secondary border-0 bg-light fw-medium">Print</button>
                <div className="input-group input-group-sm" style={{ width: 180 }}>
                    <input type="text" className="form-control border-end-0 bg-light" placeholder="Search..." />
                    <span className="input-group-text bg-light border-start-0 text-muted"><i className="bi bi-search"></i></span>
                </div>
            </div>
        </div>
    );
};

export default TaskFilterBar;
