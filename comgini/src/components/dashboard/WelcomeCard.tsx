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
            className="card border-0 shadow-sm p-3 text-white" 
            style={{ 
                background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
                borderRadius: "16px",
                minHeight: "140px"
            }}
        >
            <div className="text-center mb-3">
                <span className="small fw-light opacity-75" style={{ fontSize: "11px" }}>{today}</span>
                <h4 className="fw-bold mt-1 mb-0">Hi, {userName}</h4>
            </div>

            <button 
                className="btn btn-white w-100 py-2 fw-bold text-primary shadow-sm"
                onClick={onCreateTask}
                style={{ 
                    borderRadius: "10px", 
                    backgroundColor: "#fff",
                    fontSize: "14px"
                }}
            >
                Create a Task
            </button>
        </div>
    );
};

export default WelcomeCard;
