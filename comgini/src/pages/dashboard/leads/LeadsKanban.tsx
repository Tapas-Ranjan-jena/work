import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import KanbanColumn from "./components/KanbanColumn";
import AddLeadModal from "./components/AddLeadModal";
import dropdownService from "../../../services/dropdownService";
import type { DropdownUser } from "../../../services/dropdownService";

const columns = [
    { title: "To do", color: "#4eb7e2" },
    { title: "Under Review", color: "#ff9f1c" },
    { title: "In progress", color: "#313884" },
    { title: "Pending with the Client", color: "#10b981" },
    { title: "Pending for DSC", color: "#f87171" },
];

export default function LeadsKanban() {
    const [showModal, setShowModal] = useState(false);
    const [owners, setOwners] = useState<DropdownUser[]>([]);
    const [sources, setSources] = useState<string[]>([]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [usersRes, sourcesRes] = await Promise.all([
                    dropdownService.getUsers(),
                    dropdownService.getLeadsSources()
                ]);
                setOwners(usersRes);
                setSources(sourcesRes);
            } catch (error) {
                console.error("Failed to fetch dropdowns", error);
            }
        };
        fetchDropdowns();
    }, []);

    return (
        <div className="leads-page p-1">
            {/* ⭐ HEADER & TABS ROW */}
            <div className="mb-4">
                <h4 className="fw-bold mb-3">Leads</h4>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-1">
                    <div className="d-flex gap-4">
                        <NavLink
                            to="/leads"
                            end
                            style={({ isActive }) => ({
                                cursor: "pointer",
                                fontSize: "13px",
                                paddingBottom: "8px",
                                borderBottom: isActive ? "2px solid #3346a8" : "2px solid transparent",
                                color: isActive ? "#3346a8" : "#666",
                                fontWeight: isActive ? "500" : "400",
                                textDecoration: "none"
                            })}
                        >
                            List
                        </NavLink>
                        <NavLink
                            to="/leads/kanban"
                            style={({ isActive }) => ({
                                cursor: "pointer",
                                fontSize: "13px",
                                paddingBottom: "8px",
                                borderBottom: isActive ? "2px solid #3346a8" : "2px solid transparent",
                                color: isActive ? "#3346a8" : "#666",
                                fontWeight: isActive ? "500" : "400",
                                textDecoration: "none"
                            })}
                        >
                            Kanban
                        </NavLink>
                    </div>
                    <button
                        className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 mb-1"
                        style={{ borderRadius: "6px", fontSize: "12px" }}
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle"></i> Add Lead
                    </button>
                </div>
            </div>

            {/* ⭐ KANBAN TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3 overflow-visible">
                <div className="card-body p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 bg-white rounded">
                    <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                            <i className="bi bi-arrow-clockwise"></i>
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Owner -</option>
                            {owners.map(owner => (
                                <option key={owner.id} value={owner.id}>{owner.first_name} {owner.last_name}</option>
                            ))}
                        </select>
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Source -</option>
                            {sources.map((source, idx) => (
                                <option key={idx} value={source}>{source}</option>
                            ))}
                        </select>

                        <div className="position-relative ms-1">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-3 pe-4"
                                placeholder="Search"
                                style={{ width: "180px", background: "#fff" }}
                            />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ KANBAN CONTENT */}
            <div className="d-flex gap-3 overflow-auto pb-3" style={{ minHeight: 'calc(100vh - 280px)' }}>
                {columns.map((col) => (
                    <KanbanColumn key={col.title} {...col} />
                ))}
            </div>

            <AddLeadModal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}