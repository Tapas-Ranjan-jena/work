
import React from 'react';

export default function DirectorsDetails() {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Directors</h5>
                <button className="btn btn-primary btn-sm">Add Director</button>
            </div>
            <div className="card-body text-center py-5 text-muted">
                <p>Directors list will appear here.</p>
            </div>
        </div>
    );
}
