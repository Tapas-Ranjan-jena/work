import { useState, useEffect } from "react";
import supportService from "../../../services/supportService";
import type { SupportTicket } from "../../../services/supportTypes";
import AddTicketModal from "./modals/AddTicketModal";
import ResolveTicketModal from "./modals/ResolveTicketModal";
import toast from "react-hot-toast";

export default function HelpCenter() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'open' | 'resolved'>('open');
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
    
    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [resolveTicketId, setResolveTicketId] = useState<number | null>(null);

    const fetchTickets = async () => {
        setIsLoading(true);
        try {
            const res = await supportService.getTickets(pagination.page, pagination.limit);
            if (res.success) {
                setTickets(res.data);
                if (res.pagination) setPagination(prev => ({ ...prev, total: res.pagination!.total }));
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load tickets");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [pagination.page, pagination.limit, activeTab]);

    const filtered = tickets.filter(t => 
        t.status === activeTab &&
        (t.subject.toLowerCase().includes(search.toLowerCase()) || 
         t.description.toLowerCase().includes(search.toLowerCase()) ||
         `${t.first_name} ${t.last_name}`.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="help-center-page p-1">
            {/* ⭐ BREADCRUMB */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb small mb-1">
                    <li className="breadcrumb-item text-primary" style={{ cursor: "pointer" }}>Home</li>
                    <li className="breadcrumb-item active" aria-current="page">/Help Center</li>
                </ol>
            </nav>

            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Queries raised</h4>
                <button 
                    className="btn btn-primary d-flex align-items-center gap-2 px-3 py-1"
                    style={{ background: "#1f3b8a", borderColor: "#1f3b8a", borderRadius: "4px", fontSize: "13px" }}
                    onClick={() => setShowAddModal(true)}
                >
                    <i className="bi bi-plus-lg"></i> Add Ticket
                </button>
            </div>

            {/* ⭐ TABS */}
            <ul className="nav nav-tabs border-0 mb-4 gap-4" style={{ fontSize: "14px" }}>
                <li className="nav-item">
                    <button 
                        className={`nav-link border-0 px-0 pb-2 ${activeTab === 'open' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
                        onClick={() => setActiveTab('open')}
                        style={{ background: "transparent" }}
                    >
                        Pending
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link border-0 px-0 pb-2 ${activeTab === 'resolved' ? 'active text-primary border-bottom border-primary border-2' : 'text-muted'}`}
                        onClick={() => setActiveTab('resolved')}
                        style={{ background: "transparent" }}
                    >
                        Completed
                    </button>
                </li>
            </ul>

            {/* ⭐ TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3">
                <div className="card-body p-2 d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                        <span className="small text-muted">Show</span>
                        <select 
                            className="form-select form-select-sm" 
                            style={{ width: "80px" }}
                            value={pagination.limit}
                            onChange={(e) => setPagination({ ...pagination, limit: Number(e.target.value), page: 1 })}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="small text-muted">rows</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="small text-muted">Search:</label>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            style={{ width: "200px" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0 text-center" style={{ fontSize: "12px" }}>
                        <thead className="table-secondary">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Request id.</th>
                                <th>Date of posting</th>
                                <th>Requested by</th>
                                <th>Status</th>
                                <th>Assigned to</th>
                                <th>Closure date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={8} className="py-4 text-center text-muted">Loading queries...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={8} className="py-4 text-center text-muted">No data available in table</td></tr>
                            ) : (
                                filtered.map((ticket, index) => (
                                    <tr key={ticket.id}>
                                        <td>{((pagination.page - 1) * pagination.limit) + index + 1}</td>
                                        <td>{ticket.id}</td>
                                        <td>{new Date(ticket.created_at).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
                                        <td>{ticket.first_name} {ticket.last_name}</td>
                                        <td>
                                            <span className={`badge ${ticket.status === 'open' ? 'bg-warning text-dark' : 'bg-success text-white'}`} style={{ fontWeight: 400 }}>
                                                {ticket.status === 'open' ? 'Pending' : 'Completed'}
                                            </span>
                                        </td>
                                        <td>-</td>
                                        <td>{ticket.resolved_at ? new Date(ticket.resolved_at).toLocaleDateString("en-GB").replace(/\//g, "-") : "-"}</td>
                                        <td>
                                            {ticket.status === 'open' ? (
                                                <button 
                                                    className="btn btn-sm btn-outline-success py-0 px-2" 
                                                    style={{ fontSize: "11px" }}
                                                    onClick={() => setResolveTicketId(ticket.id)}
                                                >
                                                    Resolve
                                                </button>
                                            ) : (
                                                <button 
                                                    className="btn btn-sm btn-outline-secondary py-0 px-2 disabled" 
                                                    style={{ fontSize: "11px" }}
                                                >
                                                    Resolved
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted small">
                        Showing {filtered.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}>Previous</button>
                            </li>
                            <li className={`page-item ${pagination.page * pagination.limit >= pagination.total ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* ⭐ MODALS */}
            <AddTicketModal 
                show={showAddModal} 
                onHide={() => setShowAddModal(false)} 
                onSuccess={fetchTickets}
            />
            <ResolveTicketModal 
                show={resolveTicketId !== null}
                onHide={() => setResolveTicketId(null)}
                ticketId={resolveTicketId}
                onSuccess={fetchTickets}
            />

            <style>{`
                .nav-tabs .nav-link.active {
                    color: #0d6efd !important;
                    font-weight: 600;
                    border-bottom: 2px solid #0d6efd !important;
                }
                .breadcrumb-item + .breadcrumb-item::before {
                    content: "" !important;
                }
                .pagination .page-link {
                    color: #666;
                    border-radius: 0;
                    padding: 0.25rem 0.5rem;
                }
                .pagination .page-item.disabled .page-link {
                    background-color: #f8f9fa;
                }
            `}</style>
        </div>
    );
}
