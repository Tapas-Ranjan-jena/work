interface AddLeadModalProps {
    show: boolean;
    onClose: () => void;
}

export default function AddLeadModal({ show, onClose }: AddLeadModalProps) {
    if (!show) return null;

    const fields = [
        { label: "Title", type: "text", placeholder: "Title" },
        { label: "Company name", type: "text", placeholder: "Company name" },
        { label: "Status", type: "select", options: ["Discussion"] },
        { label: "Owner", type: "select", options: ["Shakshi Rawat"] },
        { label: "Source", type: "select", options: ["Online"] },
        { label: "Address", type: "textarea", placeholder: "Address" },
        { label: "City", type: "text", placeholder: "City" },
        { label: "State", type: "text", placeholder: "State" },
        { label: "Pincode", type: "text", placeholder: "Pincode" },
        { label: "Country", type: "text", placeholder: "Country" },
        { label: "Phone", type: "text", placeholder: "Phone" },
        { label: "Website", type: "text", placeholder: "Website" },
        { label: "GSTIN", type: "text", placeholder: "GSTIN" },
    ];

    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0 }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0" style={{ fontSize: '18px' }}>Add Lead</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">
                        ✕
                    </span>
                </div>

                {/* ⭐ CONTENT */}
                <div className="p-4 bg-white" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <div className="container-fluid px-0">
                        {fields.map((field) => (
                            <div className="row mb-3 align-items-start" key={field.label}>
                                <div className="col-3">
                                    <label className="text-muted mt-2" style={{ fontSize: '14px' }}>{field.label}</label>
                                </div>
                                <div className="col-9">
                                    {field.type === "text" && (
                                        <input className="form-control" placeholder={field.placeholder} style={{ height: '40px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    )}
                                    {field.type === "select" && (
                                        <select className="form-select" style={{ height: '40px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd', color: '#333' }}>
                                            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    )}
                                    {field.type === "textarea" && (
                                        <textarea
                                            className="form-control"
                                            placeholder={field.placeholder}
                                            rows={4}
                                            style={{ fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        ></textarea>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2 shadow-sm rounded-bottom-3">
                    <button className="btn btn-white border px-3 h-40 d-flex align-items-center gap-2 rounded-2" onClick={onClose} style={{ fontSize: '14px', color: '#333' }}>
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    <button
                        className="btn btn-primary px-3 h-40 d-flex align-items-center gap-2 rounded-2"
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <i className="bi bi-check-circle"></i> Save
                    </button>
                </div>
            </div>

            <style>{`
                .h-40 { height: 40px; }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .modal-box {
                    background: white;
                    border-radius: 12px;
                    width: 100%;
                    max-height: 90vh;
                    margin: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                .form-control::placeholder { color: #aaa; opacity: 1; }
                .form-select {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23666' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
                }
            `}</style>
        </div>
    );
}