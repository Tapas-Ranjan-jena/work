

type Props = {
    onClose: () => void;
};

export default function AssignLeaveModal({ onClose }: Props) {
    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0, overflow: "hidden" }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0">Assign Leave</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">
                        ✕
                    </span>
                </div>

                {/* ⭐ CONTENT */}
                <form className="p-4 bg-white">
                    <div className="row g-4">
                        {/* Team member */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Team member</label>
                            <select className="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>

                        {/* Leave type */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Leave type</label>
                            <select className="form-select">
                                <option value="">Select</option>
                            </select>
                        </div>

                        {/* Duration */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Duration</label>
                            <div className="form-control d-flex gap-4 p-2 px-3 border-light shadow-none" style={{ background: '#fff' }}>
                                <label className="d-flex align-items-center gap-2 small cursor-pointer">
                                    <input type="radio" name="duration" defaultChecked style={{ width: '16px', height: '16px', accentColor: '#3498db' }} /> Single day
                                </label>
                                <label className="d-flex align-items-center gap-2 small cursor-pointer">
                                    <input type="radio" name="duration" style={{ width: '16px', height: '16px', accentColor: '#3498db' }} /> Multiple days
                                </label>
                                <label className="d-flex align-items-center gap-2 small cursor-pointer">
                                    <input type="radio" name="duration" style={{ width: '16px', height: '16px', accentColor: '#3498db' }} /> Hours
                                </label>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Date</label>
                            <input type="text" className="form-control" placeholder="Date" onFocus={(e) => (e.target.type = "date")} />
                        </div>

                        {/* Reason */}
                        <div className="col-12 d-flex align-start gap-3">
                            <label className="text-muted w-150-px pt-2">Reason</label>
                            <textarea className="form-control" placeholder="Reason" rows={4}></textarea>
                        </div>
                    </div>
                </form>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2">
                    <button className="btn btn-white border px-4 h-40 d-flex align-items-center gap-2 rounded-2" onClick={onClose}>
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    <button className="btn btn-primary px-4 h-40 d-flex align-items-center gap-2 bg-gradient-blue rounded-2" onClick={onClose} style={{ background: 'linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)', border: 'none' }}>
                        <i className="bi bi-check-circle"></i> Apply leave
                    </button>
                </div>
            </div>

            <style>{`
                .w-150-px { width: 150px; flex-shrink: 0; font-size: 14px; }
                .h-40 { height: 40px; }
                .cursor-pointer { cursor: pointer; }
                .form-control::placeholder { color: #aaa; opacity: 1; }
                .bg-gradient-blue { background: linear-gradient(90deg, #3346a8 0%, #2f64c6 100%); }
            `}</style>
        </div>
    );
}
