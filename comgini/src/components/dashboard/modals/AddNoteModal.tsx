import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function AddNoteModal({ open, onClose }: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [labels, setLabels] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success("Note saved successfully");
            setLoading(false);
            onClose();
        }, 1000);
    };

    return createPortal(
        <div 
            className="modal d-block" 
            style={{ 
                background: "#00000066", 
                position: "fixed", 
                inset: 0, 
                zIndex: 3000,
                backdropFilter: "blur(2px)"
            }}
        >
            <div className="d-flex justify-content-center" style={{ paddingTop: "100px" }}>
                <div className="modal-dialog" style={{ maxWidth: "650px", width: "100%", margin: "0" }}>
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "4px" }}>
                        
                        {/* HEADER */}
                        <div className="modal-header border-0 pb-0 pt-3">
                            <h4 className="modal-title fw-normal" style={{ fontFamily: "serif", fontSize: "1.5rem" }}>Add note</h4>
                            <button type="button" className="btn-close small" onClick={onClose} style={{ fontSize: "0.8rem" }}></button>
                        </div>

                        {/* BODY */}
                        <div className="modal-body pt-4 px-4">
                            
                            {/* Title with blue bar */}
                            <div className="mb-4 position-relative">
                                <div style={{ 
                                    position: "absolute", 
                                    left: "0", 
                                    top: "0", 
                                    bottom: "0", 
                                    width: "4px", 
                                    backgroundColor: "#00bcd4", 
                                    zIndex: 1 
                                }}></div>
                                <input 
                                    type="text" 
                                    className="form-control border-0 py-2 ps-3" 
                                    placeholder="Title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ 
                                        backgroundColor: "#f1f3f4", 
                                        borderRadius: "0",
                                        fontSize: "1.1rem",
                                        fontWeight: "400"
                                    }}
                                />
                            </div>
                            
                            {/* Description */}
                            <div className="mb-4">
                                <textarea 
                                    className="form-control border-0 bg-transparent p-0" 
                                    rows={10} 
                                    placeholder="Description..." 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ 
                                        resize: "none", 
                                        fontSize: "1.1rem",
                                        color: "#5f6368",
                                        boxShadow: "none"
                                    }}
                                ></textarea>
                            </div>

                            {/* Labels */}
                            <div className="mb-2">
                                <input 
                                    type="text" 
                                    className="form-control border-0 py-3 px-3" 
                                    placeholder="Labels" 
                                    value={labels}
                                    onChange={(e) => setLabels(e.target.value)}
                                    style={{ 
                                        backgroundColor: "#f1f3f4", 
                                        borderRadius: "0",
                                        fontSize: "1.1rem",
                                        color: "#5f6368"
                                    }}
                                />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer border-0 d-flex justify-content-between px-4 pb-4">
                            <div>
                                <input ref={fileRef} type="file" hidden />
                                <button 
                                    className="btn btn-outline-secondary btn-sm border d-flex align-items-center gap-2 px-3 py-2" 
                                    onClick={() => fileRef.current?.click()}
                                    style={{ 
                                        borderRadius: "20px", 
                                        backgroundColor: "white",
                                        borderColor: "#dadce0",
                                        color: "#3c4043",
                                        fontSize: "0.9rem"
                                    }}
                                >
                                    <i className="bi bi-camera-fill text-muted"></i>
                                    <span>Upload File</span>
                                </button>
                            </div>
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 py-2" 
                                    onClick={onClose}
                                    style={{ borderColor: "#dadce0", color: "#3c4043" }}
                                >
                                    <i className="bi bi-x-lg fw-bold"></i>
                                    <span>Close</span>
                                </button>
                                <button 
                                    className="btn btn-primary btn-sm d-flex align-items-center gap-2 px-3 py-2" 
                                    onClick={handleSave}
                                    disabled={loading}
                                    style={{ backgroundColor: "#4285f4", border: "none" }}
                                >
                                    <i className="bi bi-check-circle-fill"></i>
                                    <span>{loading ? "Saving..." : "Save"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
