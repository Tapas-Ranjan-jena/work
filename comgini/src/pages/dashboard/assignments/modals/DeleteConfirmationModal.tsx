import React from "react";
import { createPortal } from "react-dom";

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    taskTitle?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirm, loading, taskTitle }) => {
    if (!open) return null;

    return createPortal(
        <div
            className="modal d-block"
            style={{
                background: "#00000066",
                position: "fixed",
                inset: 0,
                zIndex: 4000,
            }}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
                <div className="modal-content border-0 shadow-lg position-relative" style={{ borderRadius: "24px", padding: "10px" }}>
                    <button 
                        className="btn-close position-absolute" 
                        style={{ top: "20px", right: "20px", background: "#f8f9fa", padding: "10px", borderRadius: "10px", fontSize: "0.8rem" }}
                        onClick={onClose}
                    ></button>

                    <div className="modal-body p-4 pt-5">
                        <h2 className="fw-bold mb-4" style={{ fontSize: "2rem" }}>Delete Task</h2>
                        <p className="text-muted mb-5" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                            Are you sure you want to delete "{taskTitle || 'this task'}"? This action cannot be undone and all associated data will be permanently removed.
                        </p>
                        
                        <div className="d-flex gap-3 mt-4">
                            <button 
                                className="btn py-3 px-4 fw-bold text-white flex-grow-1" 
                                onClick={onClose}
                                disabled={loading}
                                style={{ 
                                    borderRadius: "16px", 
                                    background: "linear-gradient(90deg, #303f9f 0%, #4facfe 100%)",
                                    border: "none",
                                    fontSize: "1.1rem"
                                }}
                            >
                                No
                            </button>
                            <button 
                                className="btn py-3 px-4 fw-bold flex-grow-1" 
                                onClick={onConfirm}
                                disabled={loading}
                                style={{ 
                                    borderRadius: "16px", 
                                    background: "#ffebee", 
                                    color: "#ff5252",
                                    border: "none",
                                    fontSize: "1.1rem"
                                }}
                            >
                                {loading ? "Deleting..." : "Yes"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DeleteConfirmationModal;
