import React from "react";

interface WelcomeCardProps {
    userName: string;
    onCreateTask: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ userName, onCreateTask }) => {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div 
            className="w-100 p-4 text-white overflow-hidden position-relative h-100" 
            style={{ 
                background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 40px rgba(59, 130, 246, 0.15)"
            }}
        >
            <div className="position-absolute top-0 end-0 p-3 opacity-25">
                <i className="bi bi-clouds-fill display-5"></i>
            </div>
            
            <div className="mb-3">
                <div className="opacity-75 small fw-medium mb-1" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>{today}</div>
                <h3 className="fw-bold mb-0" style={{ letterSpacing: "-0.5px" }}>Hi, {userName}</h3>
                <p className="small opacity-75 mt-1 mb-0">Good afternoon! Ready for some tasks?</p>
            </div>

            <div className="mt-auto">
                <button 
                    className="btn btn-light w-100 py-2.5 fw-bold text-primary shadow-sm"
                    onClick={onCreateTask}
                    style={{ 
                        borderRadius: "14px", 
                        backgroundColor: "#ffffff",
                        fontSize: "14px",
                        border: "none",
                        transition: "transform 0.2s"
                    }}
                >
                    <i className="bi bi-plus-circle-fill me-2"></i> Create a Task
                </button>
            </div>
        </div>
    );
};

export default WelcomeCard;
