import React from "react";

const AssignmentTimeline: React.FC = () => {
    return (
        <div className="h-100 d-flex flex-column">
            <div className="dash-card-header">
                <h5 className="dash-card-title">
                    <i className="bi bi-clock-history text-primary" style={{ fontSize: '18px' }}></i> Assignment Timeline
                </h5>
            </div>
            
            <div className="dash-card-body text-muted d-flex flex-column justify-content-center">
                <p className="small mb-4">
                    The Assignment Timeline feature is currently under maintenance. 
                    You can continue creating and working on tasks as usual—there is no impact on task functionality.
                </p>
                
                <p className="small mb-4">
                    Only the timeline view is temporarily unavailable and will be restored shortly.
                </p>
                
                <p className="small mb-0 fw-bold text-dark">
                    Thank you for your patience and understanding.
                </p>
            </div>
        </div>
    );
};

export default AssignmentTimeline;
