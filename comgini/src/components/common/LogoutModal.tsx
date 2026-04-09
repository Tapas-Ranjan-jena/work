import { createPortal } from 'react-dom';
import React from 'react';

interface LogoutModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: (logoutAll: boolean) => void;
    isLoading?: boolean;
}

export default function LogoutModal({ show, onHide, onConfirm, isLoading }: LogoutModalProps) {
    const [logoutAll, setLogoutAll] = React.useState(false);

    if (!show) return null;

    return createPortal(
        <div 
            className="modal d-block" 
            style={{ 
                background: "rgba(0,0,0,0.5)", 
                position: "fixed", 
                inset: 0, 
                zIndex: 9999,
                backdropFilter: 'blur(4px)'
            }}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <div className="modal-body text-center p-5 position-relative">
                        
                        {/* Close Button X */}
                        <button 
                            type="button" 
                            className="btn-close position-absolute top-0 end-0 m-4 shadow-none" 
                            onClick={onHide}
                            aria-label="Close"
                        ></button>

                        {/* Red Power Icon */}
                        <div 
                            className="d-inline-flex align-items-center justify-content-center mb-4" 
                            style={{ 
                                width: '80px', 
                                height: '80px', 
                                backgroundColor: '#fff5f5', 
                                borderRadius: '20px',
                                color: '#ff4d4d'
                            }}
                        >
                            <i className="bi bi-power" style={{ fontSize: '2.5rem' }}></i>
                        </div>

                        <h4 className="fw-bold mb-3 text-dark">Are you sure you want to log out?</h4>
                        <p className="text-muted mb-4 px-2" style={{ fontSize: '0.95rem' }}>
                            You will be securely signed out of your account.
                        </p>

                        {/* Actions */}
                        <div className="d-flex flex-column gap-3 w-100">
                            <button 
                                className="btn btn-lg w-100 py-3 fw-bold text-white shadow-sm border-0" 
                                style={{ 
                                    borderRadius: '14px', 
                                    backgroundColor: '#ff4d4d',
                                    fontSize: '1rem'
                                }}
                                onClick={() => onConfirm(logoutAll)}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                ) : 'Log Out'}
                            </button>
                            
                            <button 
                                className="btn btn-lg btn-light w-100 py-3 fw-bold border-0" 
                                style={{ 
                                    borderRadius: '14px', 
                                    backgroundColor: '#f1f3f5',
                                    color: '#495057',
                                    fontSize: '1rem'
                                }}
                                onClick={onHide}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Checkbox */}
                        <div className="form-check d-flex justify-content-center align-items-center gap-2 mt-4 pt-2">
                            <input 
                                className="form-check-input shadow-none border-2" 
                                type="checkbox" 
                                id="logoutAll" 
                                checked={logoutAll}
                                onChange={(e) => setLogoutAll(e.target.checked)}
                                style={{ cursor: 'pointer', width: '1.1em', height: '1.1em' }}
                            />
                            <label className="form-check-label text-muted" htmlFor="logoutAll" style={{ cursor: 'pointer', fontSize: '0.85rem' }}>
                                Log out from all devices.
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
