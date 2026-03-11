import { useState, useEffect, useCallback } from 'react';
import registrationService from '../../../services/registrationService';
import type { Registration } from '../../../services/registrationService';
import type { Pagination } from '../../../services/clients/types';
import AddRegistrationModal from '../../../components/registrations/AddRegistrationModal';
import ExpiringRegistrations from '../../../components/registrations/ExpiringRegistrations';

export default function Registrations() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPagination(prev => ({ ...prev, page: 1 }));
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const fetchRegistrations = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await registrationService.getRegistrations(pagination.page, pagination.limit, debouncedSearch);
            setRegistrations(response.data);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch registrations');
        } finally {
            setIsLoading(false);
        }
    }, [pagination.page, pagination.limit, debouncedSearch]);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    const handleSuccess = () => {
        setSuccessMessage('Registration added successfully!');
        fetchRegistrations();
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleNext = () => {
        if (pagination.page * pagination.limit < pagination.total) {
            setPagination(prev => ({ ...prev, page: prev.page + 1 }));
        }
    };

    const handlePrevious = () => {
        if (pagination.page > 1) {
            setPagination(prev => ({ ...prev, page: prev.page - 1 }));
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Business Registrations</h4>
                <button
                    className="btn btn-primary d-flex align-items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <i className="bi bi-plus-lg"></i> Add Registration
                </button>
            </div>

            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i> {successMessage}
                    <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
            )}

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="input-group input-group-sm w-auto" style={{ minWidth: '250px' }}>
                            <span className="input-group-text bg-light border-end-0">
                                <i className="bi bi-search text-muted"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 bg-light"
                                placeholder="Search by company or document..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-responsive border rounded">
                        <table className="table table-bordered table-hover align-middle mb-0" style={{ fontSize: '0.875rem' }}>
                            <thead className="table-light text-secondary">
                                <tr>
                                    <th>Company Name</th>
                                    <th>Document Type</th>
                                    <th>Document Number</th>
                                    <th>Issuing Authority</th>
                                    <th>Issue Date</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Alert Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-5">
                                            <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                            Loading registrations...
                                        </td>
                                    </tr>
                                ) : registrations.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center py-4 text-muted">No records found.</td>
                                    </tr>
                                ) : (
                                    registrations.map((reg) => (
                                        <tr key={reg.id}>
                                            <td className="fw-semibold">{reg.company_name || '-'}</td>
                                            <td>{reg.document_type || '-'}</td>
                                            <td><code>{reg.document_number || '-'}</code></td>
                                            <td>{reg.issuing_authority || '-'}</td>
                                            <td>{reg.issue_date ? new Date(reg.issue_date).toLocaleDateString() : '-'}</td>
                                            <td>{reg.expiry_date ? new Date(reg.expiry_date).toLocaleDateString() : '-'}</td>
                                            <td>
                                                <span className={`badge rounded-pill ${reg.status === 'active' ? 'bg-success-subtle text-success' :
                                                    reg.status === 'expired' ? 'bg-danger-subtle text-danger' : 'bg-secondary-subtle text-secondary'
                                                    }`}>
                                                    {reg.status ? (reg.status.charAt(0).toUpperCase() + reg.status.slice(1)) : 'Unknown'}
                                                </span>
                                            </td>
                                            <td>{reg.alert_days_before ?? 0} Days</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                            Showing {registrations.length > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                        </small>
                        <nav>
                            <ul className="pagination pagination-sm m-0">
                                <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handlePrevious}>Previous</button>
                                </li>
                                <li className={`page-item ${pagination.page * pagination.limit >= pagination.total ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handleNext}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <ExpiringRegistrations />

            <AddRegistrationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
            />
        </div>
    );
}
