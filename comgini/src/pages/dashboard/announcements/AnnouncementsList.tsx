import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

interface Announcement {
    id: number;
    title: string;
    created_by: string;
    start_date: string;
    end_date: string;
}

export default function AnnouncementsList() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(100);

    const fetchAnnouncements = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/announcements", { params: { search, limit } });
            const data = res.data?.data || res.data || [];
            setAnnouncements(Array.isArray(data) ? data : []);
        } catch {
            setAnnouncements([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => fetchAnnouncements(), 400);
        return () => clearTimeout(timer);
    }, [search, limit]);

    const filtered = announcements.filter((a) =>
        a.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="announcements-page p-1">
            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Announcements</h4>
                <button
                    className="btn btn-sm btn-light border shadow-sm bg-white d-flex align-items-center gap-2 px-3"
                    style={{ borderRadius: "8px", fontSize: "13px" }}
                    onClick={() => navigate("/announcements/add")}
                >
                    <i className="bi bi-plus-circle"></i> Add announcement
                </button>
            </div>

            {/* ⭐ TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3">
                <div className="card-body p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 bg-white rounded">
                    <div className="d-flex align-items-center gap-2">
                        <select
                            className="form-select form-select-sm"
                            style={{ width: "80px", color: "#666" }}
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                        >
                            <option value={100}>100</option>
                            <option value={50}>50</option>
                            <option value={25}>25</option>
                        </select>
                        <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                            <i className="bi bi-eye-slash"></i>
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>
                            Print
                        </button>
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-3 pe-4"
                                placeholder="Search"
                                style={{ width: "180px", background: "#fff" }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Title</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Created by</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Start date</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>End date</th>
                                <th style={{ width: "40px" }} className="text-center">
                                    <i className="bi bi-list"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        Loading...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted" style={{ fontSize: "13px" }}>
                                        No record found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((a) => (
                                    <tr key={a.id}>
                                        <td style={{ fontSize: "13px" }} className="fw-medium text-dark">{a.title}</td>
                                        <td style={{ fontSize: "13px" }} className="text-muted">{a.created_by}</td>
                                        <td style={{ fontSize: "13px" }} className="text-muted">
                                            {a.start_date ? new Date(a.start_date).toLocaleDateString() : "-"}
                                        </td>
                                        <td style={{ fontSize: "13px" }} className="text-muted">
                                            {a.end_date ? new Date(a.end_date).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-sm text-secondary border-0 p-0">
                                                <i className="bi bi-three-dots-vertical"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                        {filtered.length > 0 ? `1-${filtered.length} / ${filtered.length}` : "0-0 / 0"}
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#">«</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#">»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}
