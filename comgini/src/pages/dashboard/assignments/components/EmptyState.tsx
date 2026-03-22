import React from "react";

interface EmptyStateProps {
    onCreateTask: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateTask }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center px-3" style={{ minHeight: "60vh" }}>
            <div className="mb-4">
                {/* Custom SVG Illustration - Overlapping Clipboards */}
                <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Light Blue Clipboard (Left) */}
                    <path
                        d="M145 55H105C102.239 55 100 57.2386 100 60V140C100 142.761 102.239 145 105 145H145C147.761 145 150 142.761 150 140V60C150 57.2386 147.761 55 145 55Z"
                        fill="#00AEEF"
                        opacity="0.8"
                        transform="rotate(-8 125 100)"
                    />
                    
                    {/* Grey Clipboard (Right) */}
                    <path
                        d="M175 55H135C132.239 55 130 57.2386 130 60V140C130 142.761 132.239 145 135 145H175C177.761 145 180 142.761 180 140V60C180 57.2386 177.761 55 175 55Z"
                        fill="#A7A9AC"
                        opacity="0.8"
                        transform="rotate(12 155 100)"
                    />
                    
                    {/* Dark Blue Clipboard (Center) */}
                    <rect x="105" y="55" width="55" height="90" rx="5" fill="#2E3192" />
                    
                    {/* Clipboard Clip (Center) */}
                    <rect x="120" y="48" width="25" height="12" rx="3" fill="#4B4EAB" />
                    <rect x="127" y="45" width="11" height="6" rx="1" fill="#FFFFFF" opacity="0.5" />
                </svg>
            </div>
            <h3 className="fw-bold mb-3" style={{ color: "#1a1a1a" }}>No Tasks Yet</h3>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "450px", fontSize: "1.1rem" }}>
                You have no task created in your workspace yet.<br />
                Get productive. Create a Task Now.
            </p>
            <button 
                className="btn btn-primary px-5 py-2 fw-semibold shadow-sm" 
                onClick={onCreateTask}
                style={{ 
                    borderRadius: "10px", 
                    backgroundColor: "#2E3192", 
                    border: "none",
                    fontSize: "1.1rem"
                }}
            >
                Create a Task
            </button>
        </div>
    );
};

export default EmptyState;
