import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddLeadModal from "./components/AddLeadModal";
import dropdownService from "../../../services/dropdownService";
import type { DropdownUser } from "../../../services/dropdownService";
import leadsService from "../../../services/leadsService";
import type { Lead } from "../../../services/leadsService";

export default function LeadsList() {
    const [showModal, setShowModal] = useState(false);
    const [editLeadId, setEditLeadId] = useState<string | null>(null);
    const [owners, setOwners] = useState<DropdownUser[]>([]);
    const [sources, setSources] = useState<string[]>([]);
    const [statusList, setStatusList] = useState<string[]>([]);
    
    // Leads Data State
    const [leads, setLeads] = useState<Lead[]>([]);
    const [totalLeads, setTotalLeads] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const [usersRes, sourcesRes, statusRes] = await Promise.all([
                    dropdownService.getUsers(),
                    dropdownService.getLeadsSources(),
                    dropdownService.getLeadsStatusList()
                ]);
                setOwners(usersRes);
                setSources(sourcesRes);
                setStatusList(statusRes);
            } catch (error) {
                console.error("Failed to fetch dropdowns", error);
            }
        };
        
        const fetchLeads = async () => {
            try {
                const res = await leadsService.getLeadsList({ page, limit, owner: '', source: '', status: '', search: '' });
                setLeads(res?.leads || []);
                setTotalLeads(res?.total || 0);
            } catch (error) {
                console.error("Failed to fetch leads", error);
            }
        };

        fetchDropdowns();
        fetchLeads();
    }, [page, limit]);

    const handleDeleteLead = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                await leadsService.deleteLead(id);
                setLeads(leads.filter(l => l.id !== id));
                setTotalLeads(prev => prev > 0 ? prev - 1 : 0);
            } catch (error) {
                console.error("Failed to delete lead", error);
            }
        }
    };

    const handleEditClick = (id: string) => {
        setEditLeadId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditLeadId(null);
        // Optionally refetch leads, but skipping for simplicity
    };

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
                        onClick={() => { setEditLeadId(null); setShowModal(true); }}
                    >
                        <i className="bi bi-plus-circle"></i> Add Lead
                    </button>
                </div>
            </div>

            {/* ⭐ TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3 overflow-visible">
                <div className="card-body p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 bg-white rounded">
                    <div className="d-flex align-items-center gap-2">
                        <select className="form-select form-select-sm" style={{ width: "80px", color: "#666" }} value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                            <option value="100">100</option>
                            <option value="50">50</option>
                            <option value="25">25</option>
                            <option value="10">10</option>
                        </select>
                        <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                            <i className="bi bi-eye-slash"></i>
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
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Status -</option>
                            {statusList.map((status, idx) => (
                                <option key={idx} value={status}>{status}</option>
                            ))}
                        </select>

                        <div className="d-flex align-items-center gap-1">
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

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

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0 rounded-0">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>
                                    Title <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                                </th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Company name</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Primary contact</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Owner</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Status</th>
                                <th style={{ width: "80px" }} className="text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.length > 0 ? (
                                leads.map(lead => (
                                    <tr key={lead.id} style={{ height: '40px' }}>
                                        <td className="text-dark fw-medium" style={{ fontSize: "12px" }}>{lead.title}</td>
                                        <td className="text-muted" style={{ fontSize: "12px" }}>{lead.company_name}</td>
                                        <td className="text-muted" style={{ fontSize: "12px" }}>{lead.primary_contact}</td>
                                        <td className="text-muted" style={{ fontSize: "12px" }}>{lead.owner}</td>
                                        <td className="text-muted" style={{ fontSize: "12px" }}>{lead.status}</td>
                                        <td className="text-center text-muted">
                                            <button className="btn btn-sm p-0 me-2 text-primary" onClick={() => handleEditClick(lead.id)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-sm p-0 text-danger" onClick={() => handleDeleteLead(lead.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4 text-muted" style={{ fontSize: "12px", border: 'none' }}>
                                        No record found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-1 px-3">
                    <span className="text-muted" style={{ fontSize: "11px" }}>
                        Showing {Math.min((page - 1) * limit + 1, totalLeads)}-{Math.min(page * limit, totalLeads)} of {totalLeads}
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link border bg-light text-muted px-2 py-1" style={{ fontSize: '10px' }} onClick={() => setPage(p => Math.max(1, p - 1))}>«</button>
                            </li>
                            <li className={`page-item ${page * limit >= totalLeads ? 'disabled' : ''} ms-1`}>
                                <button className="page-link border bg-light text-muted px-2 py-1" style={{ fontSize: '10px' }} onClick={() => setPage(p => p + 1)}>»</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <AddLeadModal show={showModal} onClose={handleCloseModal} editId={editLeadId || undefined} />

            <style>{`
                .leads-page .table thead th { background-color: #fcfcfc; border-bottom: 1px solid #eee; padding: 12px 8px; }
                .leads-page .table tbody td { padding: 12px 8px; border-bottom: 1px solid #eee; }
                .leads-page .form-control::placeholder { color: #aaa; }
                .leads-page .form-control-sm, .leads-page .form-select-sm { height: 32px; }
            `}</style>
        </div>
    );
}