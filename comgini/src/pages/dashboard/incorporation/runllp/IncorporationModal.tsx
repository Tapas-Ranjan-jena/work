import { useState, useEffect } from "react";
import type { Incorporation, CreateIncorporationRequest, UpdateIncorporationRequest } from "../../../../services/incorporation/types";
import incorporationService from "../../../../services/incorporation/incorporation.service";

type Props = {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
    incorporation?: Incorporation | null;
};

export default function IncorporationModal({ show, onClose, onSuccess, incorporation }: Props) {
    const [formData, setFormData] = useState<any>({
        form_type: "RUN-LLP",
        proposed_name_1: "",
        proposed_name_2: "",
        mca_user: "",
        submission_status: "draft",
        fee_paid: 1000,
        remarks: "",
        srn: "",
        approval_date: "",
        expiry_date: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (incorporation) {
            setFormData({
                form_type: incorporation.form_type,
                proposed_name_1: incorporation.proposed_name_1,
                proposed_name_2: incorporation.proposed_name_2,
                mca_user: incorporation.mca_user,
                submission_status: incorporation.submission_status,
                fee_paid: incorporation.fee_paid,
                remarks: incorporation.remarks,
                srn: incorporation.srn || "",
                approval_date: incorporation.approval_date || "",
                expiry_date: incorporation.expiry_date || ""
            });
        } else {
            setFormData({
                form_type: "RUN-LLP",
                proposed_name_1: "",
                proposed_name_2: "",
                mca_user: "",
                submission_status: "draft",
                fee_paid: 1000,
                remarks: "",
                srn: "",
                approval_date: "",
                expiry_date: ""
            });
        }
    }, [incorporation, show]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            if (incorporation) {
                const updateData: UpdateIncorporationRequest = {
                    ...formData,
                    fee_paid: Number(formData.fee_paid)
                };
                await incorporationService.updateIncorporation(incorporation.id, updateData);
            } else {
                const createData: CreateIncorporationRequest = {
                    form_type: formData.form_type,
                    proposed_name_1: formData.proposed_name_1,
                    proposed_name_2: formData.proposed_name_2,
                    mca_user: formData.mca_user,
                    submission_status: formData.submission_status,
                    fee_paid: Number(formData.fee_paid),
                    remarks: formData.remarks
                };
                await incorporationService.createIncorporation(createData);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header bg-light">
                        <h6 className="modal-title fw-bold">
                            {incorporation ? "Edit Incorporation" : "Create New Incorporation"}
                        </h6>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            {error && <div className="alert alert-danger small py-2">{error}</div>}

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Form Type</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="form_type"
                                        value={formData.form_type}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">MCA User</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        name="mca_user"
                                        value={formData.mca_user}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Proposed Name 1</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="proposed_name_1"
                                        value={formData.proposed_name_1}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Proposed Name 2</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="proposed_name_2"
                                        value={formData.proposed_name_2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Submission Status</label>
                                    <select
                                        className="form-select form-select-sm"
                                        name="submission_status"
                                        value={formData.submission_status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Fee Paid</label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        name="fee_paid"
                                        value={formData.fee_paid}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {incorporation && (
                                    <>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-semibold">SRN</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="srn"
                                                value={formData.srn}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-semibold">Approval Date</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                name="approval_date"
                                                value={formData.approval_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-semibold">Expiry Date</label>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm"
                                                name="expiry_date"
                                                value={formData.expiry_date}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="col-12">
                                    <label className="form-label small fw-semibold">Remarks</label>
                                    <textarea
                                        className="form-control form-control-sm"
                                        name="remarks"
                                        rows={3}
                                        value={formData.remarks}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer bg-light p-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-sm text-white px-4"
                                style={{ background: "#2E388E" }}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm me-1"></span>
                                ) : null}
                                {incorporation ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
