

type Props = {
    onClose: () => void;
};

export default function AddTimeModal({ onClose }: Props) {
    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0, overflow: "hidden" }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0">Add Time Manually</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">
                        ✕
                    </span>
                </div>

                {/* ⭐ CONTENT */}
                <form className="p-4 bg-white">
                    <div className="row g-4">
                        {/* Team Member */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Team Member</label>
                            <select className="form-select">
                                <option value="">-</option>
                            </select>
                        </div>

                        {/* Mode of joining */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Mode of joining</label>
                            <div className="form-control d-flex gap-4 p-2 px-3 border-light shadow-none" style={{ background: '#fff' }}>
                                <label className="d-flex align-items-center gap-2 small cursor-pointer">
                                    <input type="radio" name="mode" defaultChecked style={{ width: '16px', height: '16px', accentColor: '#3498db' }} /> Work From Office
                                </label>
                                <label className="d-flex align-items-center gap-2 small cursor-pointer">
                                    <input type="radio" name="mode" style={{ width: '16px', height: '16px', accentColor: '#3498db' }} /> Work From Home
                                </label>
                            </div>
                        </div>

                        {/* In Date & In Time */}
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">In Date</label>
                            <input type="text" className="form-control" placeholder="In Date" onFocus={(e) => (e.target.type = "date")} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <label className="text-muted" style={{ width: "80px", flexShrink: 0 }}>In Time</label>
                            <input type="text" className="form-control" placeholder="In Time" onFocus={(e) => (e.target.type = "time")} />
                        </div>

                        {/* Out Date & Out Time */}
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Out Date</label>
                            <input type="text" className="form-control" placeholder="Out date" onFocus={(e) => (e.target.type = "date")} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <label className="text-muted" style={{ width: "80px", flexShrink: 0 }}>Out Time</label>
                            <input type="text" className="form-control" placeholder="Out Time" onFocus={(e) => (e.target.type = "time")} />
                        </div>

                        {/* Note */}
                        <div className="col-12 d-flex align-start gap-3">
                            <label className="text-muted w-150-px pt-2">Note</label>
                            <textarea className="form-control" placeholder="Note" rows={4}></textarea>
                        </div>
                    </div>
                </form>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2">
                    <button className="btn btn-white border px-4 h-40 d-flex align-items-center gap-2 rounded-2" onClick={onClose}>
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    <button className="btn btn-primary px-4 h-40 d-flex align-items-center gap-2 bg-gradient-blue rounded-2" onClick={onClose} style={{ background: 'linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)', border: 'none' }}>
                        <i className="bi bi-check-circle"></i> Save
                    </button>
                </div>
            </div>

            <style>{`
                .w-150-px { width: 150px; flex-shrink: 0; font-size: 14px; }
                .h-40 { height: 40px; }
                .cursor-pointer { cursor: pointer; }
                .form-control::placeholder { color: #aaa; opacity: 1; }
            `}</style>
        </div>
    );
}
