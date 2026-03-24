import React from "react";
import { Link } from "react-router-dom";

interface Update {
    id: number;
    title: string;
    tag: string;
    updated_at: string;
}

interface UpdatesListProps {
    updates: Update[];
}

const UpdatesList: React.FC<UpdatesListProps> = ({ updates }) => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-');
    };

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-file-earmark-text text-primary"></i> New Updates
                </h5>
                <i className="bi bi-caret-up-fill small"></i>
            </div>

            <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                    <thead className="text-muted small fw-bold">
                        <tr>
                            <th className="ps-0 border-bottom py-3">Particulars of Update</th>
                            <th className="text-end border-bottom py-3 pe-0">Updated on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {updates.length > 0 ? updates.map((update) => (
                            <tr key={update.id} className="border-bottom">
                                <td className="ps-0 py-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="fw-bold text-dark small">{update.title}</span>
                                        {update.tag && (
                                            <span className="badge bg-danger rounded-pill px-2 py-1" style={{ fontSize: "10px" }}>{update.tag}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="text-end py-3 pe-0 text-muted small fw-medium">
                                    {formatDate(update.updated_at)}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={2} className="text-center py-4 text-muted">No updates available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-4 pt-2">
                <Link to="#" className="text-decoration-none fw-bold text-primary small d-flex align-items-center justify-content-center">
                    View More <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
};

export default UpdatesList;
