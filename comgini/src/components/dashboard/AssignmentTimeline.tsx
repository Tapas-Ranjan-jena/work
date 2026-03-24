import React from "react";

const AssignmentTimeline: React.FC = () => {
    return (
        <div className="card shadow-sm border-0 p-4 h-100 text-muted" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
            <h5 className="fw-bold mb-4 text-dark d-flex align-items-center gap-2">
                <i className="bi bi-clock-history"></i> Assignment Timeline
            </h5>
            
            <p className="small mb-4">
                The Assignment Timeline feature is currently under maintenance. 
                You can continue creating and working on tasks as usual—there is no impact on task functionality.
            </p>
            
            <p className="small mb-4">
                Only the timeline view is temporarily unavailable and will be restored shortly.
            </p>
            
            <p className="small mb-0 fw-bold">
                Thank you for your patience and understanding.
            </p>
        </div>
    );
};

export default AssignmentTimeline;
