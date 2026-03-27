import { useState, useEffect } from "react";
import api from "../../../api/api";

interface HelpVideo {
    id: number;
    sr_no: number;
    title: string;
    video_url: string | null;
}

// Static fallback list matching the screenshots
const STATIC_VIDEOS: HelpVideo[] = [
    { id: 1, sr_no: 1, title: "Add Team Member", video_url: null },
    { id: 2, sr_no: 2, title: "Marking Attendence", video_url: null },
    { id: 3, sr_no: 3, title: "Add Task", video_url: null },
    { id: 4, sr_no: 4, title: "Event Calendar", video_url: null },
    { id: 5, sr_no: 5, title: "Notes", video_url: null },
    { id: 6, sr_no: 6, title: "Messages", video_url: null },
    { id: 7, sr_no: 7, title: "Timeline", video_url: null },
    { id: 8, sr_no: 8, title: "LexBuddy", video_url: null },
    { id: 9, sr_no: 9, title: "TCA 2013", video_url: null },
    { id: 10, sr_no: 10, title: "Add Client", video_url: null },
    { id: 11, sr_no: 11, title: "Client Profile", video_url: null },
    { id: 12, sr_no: 12, title: "Primary Contacts", video_url: null },
    { id: 13, sr_no: 13, title: "Assignment", video_url: null },
    { id: 14, sr_no: 14, title: "Invoice and Payments", video_url: null },
    { id: 15, sr_no: 15, title: "Notes (Client specific)", video_url: null },
    { id: 16, sr_no: 16, title: "Files and events", video_url: null },
    { id: 17, sr_no: 17, title: "Business Manager", video_url: null },
    { id: 18, sr_no: 18, title: "Expiry Manager", video_url: null },
    { id: 19, sr_no: 19, title: "Company Master", video_url: null },
    { id: 20, sr_no: 20, title: "Director and KMP Master", video_url: null },
    { id: 21, sr_no: 21, title: "Capital Structure", video_url: null },
    { id: 22, sr_no: 22, title: "Shareholder Master", video_url: null },
    { id: 23, sr_no: 23, title: "Share Certificates", video_url: null },
    { id: 24, sr_no: 24, title: "Auditor Master", video_url: null },
    { id: 25, sr_no: 25, title: "Meeting Minutes", video_url: null },
    { id: 26, sr_no: 26, title: "Statutory Registers", video_url: null },
    { id: 27, sr_no: 27, title: "Annual Filing Board Report", video_url: null },
    { id: 28, sr_no: 28, title: "Compliance tracker", video_url: null },
    { id: 29, sr_no: 29, title: "MGT-1", video_url: null },
    { id: 30, sr_no: 30, title: "Register of Charges", video_url: null },
    { id: 31, sr_no: 31, title: "Register of Director and KMP", video_url: null },
    { id: 32, sr_no: 32, title: "MBP 2", video_url: null },
    { id: 33, sr_no: 33, title: "MBP-3.mp4", video_url: null },
    { id: 34, sr_no: 34, title: "MBP-4", video_url: null },
    { id: 35, sr_no: 35, title: "Register of Share Transfer", video_url: null },
    { id: 36, sr_no: 36, title: "DMS", video_url: null },
    { id: 37, sr_no: 37, title: "Annual Filing Status", video_url: null },
    { id: 38, sr_no: 38, title: "DSC Management", video_url: null },
    { id: 39, sr_no: 39, title: "DIR 3 KYC Status", video_url: null },
    { id: 40, sr_no: 40, title: "MCA Transaction Tracking", video_url: null },
    { id: 41, sr_no: 41, title: "E forms", video_url: null },
];

export default function HelpVideos() {
    const [videos, setVideos] = useState<HelpVideo[]>(STATIC_VIDEOS);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(100);
    const [activeVideo, setActiveVideo] = useState<HelpVideo | null>(null);

    useEffect(() => {
        // Try to load from API; fall back to static list
        api.get("/help/videos").then((res: any) => {
            const data = res.data?.data || res.data;
            if (Array.isArray(data) && data.length > 0) setVideos(data);
        }).catch(() => { /* use static */ });
    }, []);

    const filtered = videos.filter(
        (v) => v.title?.toLowerCase().includes(search.toLowerCase())
    ).slice(0, limit);

    return (
        <div className="help-videos-page p-1">
            {/* ⭐ HEADER */}
            <div className="mb-4">
                <h4 className="mb-0 fw-bold">Help Videos</h4>
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
                    <div className="position-relative">
                        <input
                            type="text"
                            className="form-control form-control-sm ps-3 pe-4"
                            placeholder="Search"
                            style={{ width: "200px" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                    </div>
                </div>
            </div>

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px", width: "80px" }}>
                                    Sr No <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                                </th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Title</th>
                                <th className="text-center fw-semibold text-dark" style={{ fontSize: "13px", width: "80px" }}>
                                    <i className="bi bi-list"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-4 text-muted" style={{ fontSize: "13px" }}>
                                        No record found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((video) => (
                                    <tr key={video.id}>
                                        <td className="text-muted" style={{ fontSize: "13px" }}>{video.sr_no}</td>
                                        <td>
                                            <span
                                                className="text-primary"
                                                style={{ fontSize: "13px", cursor: video.video_url ? "pointer" : "default" }}
                                                onClick={() => video.video_url && setActiveVideo(video)}
                                            >
                                                {video.title}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {video.video_url ? (
                                                <button
                                                    className="btn btn-sm text-primary border-0 p-0"
                                                    style={{ fontSize: "13px" }}
                                                    onClick={() => setActiveVideo(video)}
                                                >
                                                    View
                                                </button>
                                            ) : (
                                                <span className="text-muted" style={{ fontSize: "13px" }}>View</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ⭐ VIDEO MODAL */}
            {activeVideo && (
                <div className="modal-overlay" onClick={() => setActiveVideo(null)}>
                    <div className="modal-box" style={{ maxWidth: "800px" }} onClick={(e) => e.stopPropagation()}>
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                            <h6 className="fw-bold mb-0">{activeVideo.title}</h6>
                            <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={() => setActiveVideo(null)} className="text-muted">✕</span>
                        </div>
                        <div className="p-3">
                            {activeVideo.video_url ? (
                                <video controls style={{ width: "100%", borderRadius: "8px" }}>
                                    <source src={activeVideo.video_url} />
                                </video>
                            ) : (
                                <p className="text-muted text-center py-4">No video available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999; }
                .modal-box { background: white; border-radius: 12px; width: 100%; max-width: 600px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            `}</style>
        </div>
    );
}
