export default function UserManual() {
    // The PDF URL - can be changed to a real hosted URL or loaded from API
    const pdfUrl = "https://www.complyrelax.com/user-manual.pdf";

    return (
        <div className="user-manual-page p-1" style={{ height: "calc(100vh - 80px)" }}>
            <div
                className="card shadow-sm border-0"
                style={{ height: "100%", overflow: "hidden", borderRadius: "8px" }}
            >
                {/* Header bar mimicking the PDF viewer header */}
                <div
                    className="d-flex align-items-center px-3 py-2 border-bottom"
                    style={{ background: "#323639", color: "#fff", fontSize: "13px", gap: "12px" }}
                >
                    <i className="bi bi-list" style={{ fontSize: "18px", cursor: "pointer" }}></i>
                    <span className="fw-semibold">USER MANUAL</span>
                </div>

                {/* Embedded PDF */}
                <iframe
                    src={pdfUrl}
                    title="User Manual"
                    width="100%"
                    style={{ border: "none", flexGrow: 1, height: "calc(100% - 44px)" }}
                />
            </div>
        </div>
    );
}
