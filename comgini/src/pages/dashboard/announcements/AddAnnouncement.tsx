import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

export default function AddAnnouncement() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [shareWithTeam, setShareWithTeam] = useState(true);
    const [shareWithClients, setShareWithClients] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Rich text editor toolbar actions
    const execCmd = (cmd: string, value?: string) => {
        document.execCommand(cmd, false, value);
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("start_date", startDate);
            formData.append("end_date", endDate);
            formData.append("share_with_team", String(shareWithTeam));
            formData.append("share_with_clients", String(shareWithClients));
            if (file) formData.append("file", file);

            await api.post("/announcements", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/announcements");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to save announcement.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-announcement-page p-1">
            <h4 className="mb-4 fw-bold">Add announcement</h4>

            {error && <div className="alert alert-danger small py-2">{error}</div>}

            <div className="card shadow-sm border-0 p-4">
                {/* ⭐ TITLE */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ fontSize: "14px" }}
                    />
                </div>

                {/* ⭐ RICH TEXT EDITOR */}
                <div className="border rounded mb-3" style={{ overflow: "hidden" }}>
                    {/* Toolbar */}
                    <div
                        className="d-flex flex-wrap align-items-center gap-1 p-2 border-bottom bg-light"
                        style={{ fontSize: "13px" }}
                    >
                        {/* Format buttons */}
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("bold")} title="Bold"><b>B</b></button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("italic")} title="Italic"><i>I</i></button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("underline")} title="Underline"><u>U</u></button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("strikeThrough")} title="Strike"><s>S</s></button>

                        <div className="vr mx-1"></div>

                        {/* Font select */}
                        <select
                            className="form-select form-select-sm"
                            style={{ width: "100px", fontSize: "12px" }}
                            onChange={(e) => execCmd("fontName", e.target.value)}
                        >
                            <option value="Cambria">Cambria</option>
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                        </select>

                        <div className="vr mx-1"></div>

                        {/* Color */}
                        <input
                            type="color"
                            className="form-control form-control-sm p-0 border-0"
                            style={{ width: "28px", height: "28px", cursor: "pointer" }}
                            title="Text color"
                            onChange={(e) => execCmd("foreColor", e.target.value)}
                        />

                        <div className="vr mx-1"></div>

                        {/* Lists */}
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("insertUnorderedList")} title="Bullet list">
                            <i className="bi bi-list-ul"></i>
                        </button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("insertOrderedList")} title="Numbered list">
                            <i className="bi bi-list-ol"></i>
                        </button>

                        <div className="vr mx-1"></div>

                        {/* Alignment */}
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("justifyLeft")} title="Align left">
                            <i className="bi bi-text-left"></i>
                        </button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("justifyCenter")} title="Align center">
                            <i className="bi bi-text-center"></i>
                        </button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("justifyRight")} title="Align right">
                            <i className="bi bi-text-right"></i>
                        </button>

                        <div className="vr mx-1"></div>

                        {/* HR / Image */}
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("insertHorizontalRule")} title="Horizontal rule">—</button>
                        <button className="btn btn-sm btn-light border px-2 py-0" onClick={() => execCmd("removeFormat")} title="Clear format">
                            <i className="bi bi-eraser"></i>
                        </button>
                    </div>

                    {/* Editable Content Area */}
                    <div
                        contentEditable
                        suppressContentEditableWarning
                        className="p-3"
                        style={{ minHeight: "180px", fontSize: "14px", outline: "none" }}
                        onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
                        data-placeholder="Write your announcement here..."
                    />
                </div>

                {/* ⭐ DATES */}
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label small text-muted fw-semibold">Start date</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="DD-MM-YYYY"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{ fontSize: "13px" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small text-muted fw-semibold">End date</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="DD-MM-YYYY"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{ fontSize: "13px" }}
                        />
                    </div>
                </div>

                {/* ⭐ SHARE WITH */}
                <div className="mb-4">
                    <label className="form-label small text-muted fw-semibold">Share with</label>
                    <div className="d-flex flex-column gap-1">
                        <label className="d-flex align-items-center gap-2" style={{ cursor: "pointer", fontSize: "13px" }}>
                            <input
                                type="checkbox"
                                checked={shareWithTeam}
                                onChange={(e) => setShareWithTeam(e.target.checked)}
                                style={{ accentColor: "#3346a8" }}
                            />
                            All team members
                        </label>
                        <label className="d-flex align-items-center gap-2" style={{ cursor: "pointer", fontSize: "13px" }}>
                            <input
                                type="checkbox"
                                checked={shareWithClients}
                                onChange={(e) => setShareWithClients(e.target.checked)}
                                style={{ accentColor: "#3346a8" }}
                            />
                            All Clients
                        </label>
                    </div>
                </div>

                {/* ⭐ FOOTER: Upload + Save */}
                <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <button
                            className="btn btn-sm btn-light border px-3 d-flex align-items-center gap-2"
                            style={{ fontSize: "13px" }}
                            onClick={() => fileInputRef.current?.click()}
                            type="button"
                        >
                            <i className="bi bi-upload"></i>
                            {file ? file.name : "Upload File"}
                        </button>
                    </div>
                    <button
                        className="btn px-4 d-flex align-items-center gap-2"
                        style={{
                            background: "linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)",
                            border: "none",
                            color: "#fff",
                            borderRadius: "8px",
                            fontSize: "13px",
                        }}
                        onClick={handleSave}
                        disabled={isLoading}
                    >
                        {isLoading && <span className="spinner-border spinner-border-sm me-1"></span>}
                        <i className="bi bi-check-circle"></i> Save
                    </button>
                </div>
            </div>

            <style>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #aaa;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}
