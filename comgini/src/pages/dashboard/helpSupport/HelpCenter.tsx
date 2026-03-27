import { useState, useEffect } from "react";
import api from "../../../api/api";

interface HelpArticle {
    id: number;
    title: string;
    category: string;
    content: string;
}

export default function HelpCenter() {
    const [articles, setArticles] = useState<HelpArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

    useEffect(() => {
        api.get("/help/articles").then((res: any) => {
            const data = res.data?.data || res.data || [];
            setArticles(Array.isArray(data) ? data : []);
        }).catch(() => {
            setArticles([]);
        }).finally(() => setIsLoading(false));
    }, []);

    const filtered = articles.filter(
        (a) =>
            a.title?.toLowerCase().includes(search.toLowerCase()) ||
            a.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedArticle) {
        return (
            <div className="help-center-article p-1">
                <button
                    className="btn btn-sm btn-light border mb-3 d-flex align-items-center gap-2"
                    onClick={() => setSelectedArticle(null)}
                >
                    <i className="bi bi-arrow-left"></i> Back to Help Center
                </button>
                <div className="card shadow-sm border-0 p-4">
                    <h5 className="fw-bold mb-3">{selectedArticle.title}</h5>
                    <span className="badge bg-light text-primary border mb-3" style={{ fontSize: "12px" }}>
                        {selectedArticle.category}
                    </span>
                    <div
                        style={{ fontSize: "14px", lineHeight: "1.8", color: "#444" }}
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="help-center-page p-1">
            {/* ⭐ HEADER */}
            <div className="mb-4">
                <h4 className="mb-0 fw-bold">Help Center</h4>
                <p className="text-muted small mt-1">Find answers to your questions and learn how to use the platform.</p>
            </div>

            {/* ⭐ SEARCH BAR */}
            <div className="mb-4">
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control form-control-lg ps-4 pe-5 shadow-sm"
                        placeholder="Search for help..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ borderRadius: "12px", fontSize: "14px" }}
                    />
                    <i
                        className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-3 text-muted"
                        style={{ fontSize: "18px" }}
                    ></i>
                </div>
            </div>

            {/* ⭐ QUICK LINKS */}
            {!search && (
                <div className="row g-3 mb-4">
                    {[
                        { icon: "bi-people", label: "Team & HR", color: "#3346a8" },
                        { icon: "bi-kanban", label: "Tasks & Assignments", color: "#2f64c6" },
                        { icon: "bi-folder2-open", label: "Clients", color: "#5e35b1" },
                        { icon: "bi-cash-stack", label: "Finance", color: "#00897b" },
                        { icon: "bi-building", label: "Masters", color: "#e65100" },
                        { icon: "bi-gear", label: "Settings", color: "#546e7a" },
                    ].map((cat) => (
                        <div key={cat.label} className="col-6 col-md-4 col-lg-2">
                            <div
                                className="card border-0 shadow-sm text-center p-3 h-100"
                                style={{ cursor: "pointer", borderRadius: "12px", transition: "transform 0.15s" }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                            >
                                <div
                                    className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "12px",
                                        background: `${cat.color}18`,
                                    }}
                                >
                                    <i className={`bi ${cat.icon}`} style={{ fontSize: "20px", color: cat.color }}></i>
                                </div>
                                <span style={{ fontSize: "12px", fontWeight: 500, color: "#333" }}>{cat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ⭐ ARTICLES */}
            <div className="card shadow-sm border-0">
                {isLoading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-2"></div>
                        <p className="text-muted small">Loading articles...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-search mb-2" style={{ fontSize: "32px" }}></i>
                        <p>No articles found{search && ` for "${search}"`}.</p>
                    </div>
                ) : (
                    <div className="list-group list-group-flush">
                        {filtered.map((article) => (
                            <button
                                key={article.id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-4 py-3"
                                onClick={() => setSelectedArticle(article)}
                                style={{ border: "none", borderBottom: "1px solid #f0f0f0" }}
                            >
                                <div>
                                    <div className="fw-medium text-dark" style={{ fontSize: "13px" }}>{article.title}</div>
                                    <span className="badge bg-light text-muted border mt-1" style={{ fontSize: "11px" }}>{article.category}</span>
                                </div>
                                <i className="bi bi-chevron-right text-muted"></i>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
