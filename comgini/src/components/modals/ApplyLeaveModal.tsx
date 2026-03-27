import { useState } from "react";
import hrmsService from "../../services/hrms/hrms.service";

type Props = {
    onClose: () => void;
    onSuccess?: () => void;
};

export default function ApplyLeaveModal({ onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState({
        leave_type: "casual",
        start_date: "",
        end_date: "",
        total_days: 1,
        reason: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.start_date || !formData.end_date || !formData.reason) {
            setError("Please fill all required fields.");
            return;
        }
        setIsLoading(true);
        setError("");
        try {
            await hrmsService.applyLeave({
                ...formData,
                total_days: Number(formData.total_days),
            });
            onSuccess?.();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to apply leave.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0, overflow: "hidden" }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0">Apply Leave</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">
                        ✕
                    </span>
                </div>

                {/* ⭐ CONTENT */}
                <form className="p-4 bg-white" onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger small py-2">{error}</div>}
                    <div className="row g-4">

                        {/* Leave Type */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Leave Type</label>
                            <select className="form-select" name="leave_type" value={formData.leave_type} onChange={handleChange}>
                                <option value="casual">Casual</option>
                                <option value="sick">Sick</option>
                                <option value="earned">Earned</option>
                                <option value="maternity">Maternity</option>
                                <option value="paternity">Paternity</option>
                                <option value="unpaid">Unpaid</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div className="col-6 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Start Date</label>
                            <input type="date" className="form-control" name="start_date" value={formData.start_date} onChange={handleChange} required />
                        </div>

                        {/* End Date */}
                        <div className="col-6 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">End Date</label>
                            <input type="date" className="form-control" name="end_date" value={formData.end_date} onChange={handleChange} required />
                        </div>

                        {/* Total Days */}
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="text-muted w-150-px">Total Days</label>
                            <input type="number" className="form-control" name="total_days" value={formData.total_days} min={1} onChange={handleChange} required />
                        </div>

                        {/* Reason */}
                        <div className="col-12 d-flex align-start gap-3">
                            <label className="text-muted w-150-px pt-2">Reason</label>
                            <textarea className="form-control" placeholder="Reason" rows={4} name="reason" value={formData.reason} onChange={handleChange} required></textarea>
                        </div>
                    </div>
                </form>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2">
                    <button className="btn btn-white border px-4 h-40 d-flex align-items-center gap-2 rounded-2" onClick={onClose} type="button">
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    <button
                        className="btn btn-primary px-4 h-40 d-flex align-items-center gap-2 rounded-2"
                        style={{ background: 'linear-gradient(90deg, #3346a8 0%, #2f64c6 100%)', border: 'none' }}
                        onClick={handleSubmit as any}
                        disabled={isLoading}
                    >
                        {isLoading && <span className="spinner-border spinner-border-sm me-1"></span>}
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
