import React, { useState } from "react";

interface MasterDataFormModalProps {
    onClose: () => void;
}

const MasterDataFormModal: React.FC<MasterDataFormModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        onClose();
    };

    return (
        <div className="modal-overlay" style={{ background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
            <div className="modal-box bg-white overflow-hidden p-0" style={{ maxWidth: "500px", width: "90%", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">MCA Master Data</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Full Name <span className="text-danger">*</span></label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your name here..."
                                style={{ borderRadius: "8px", height: "45px" }}
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Email Id <span className="text-danger">*</span></label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Enter your email here..."
                                style={{ borderRadius: "8px", height: "45px" }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small">Phone Number <span className="text-danger">*</span></label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                placeholder="Ex +919876543210"
                                style={{ borderRadius: "8px", height: "45px" }}
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 fw-bold" 
                            style={{ 
                                height: "50px", 
                                borderRadius: "10px", 
                                background: "#4dabf7", 
                                border: "none",
                                fontSize: "16px"
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MasterDataFormModal;
