import { useState, useEffect } from 'react';
import registrationService from '../../services/registrationService';
import api from '../../api/api';
import type { ApiResponse } from '../../services/clients/types';

interface AddRegistrationModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddRegistrationModal({ show, onClose, onSuccess }: AddRegistrationModalProps) {
    const [companies, setCompanies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        company_id: '',
        document_type: '',
        document_number: '',
        issuing_authority: '',
        issue_date: '',
        expiry_date: '',
        alert_days_before: 30
    });

    useEffect(() => {
        if (show) {
            fetchCompanies();
        }
    }, [show]);

    const fetchCompanies = async () => {
        try {
            const response = await api.get<ApiResponse<any[]>>('/companies');
            setCompanies(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch companies', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await registrationService.createRegistration({
                company_id: Number(formData.company_id),
                document_type: formData.document_type,
                document_number: formData.document_number,
                issuing_authority: formData.issuing_authority,
                issue_date: formData.issue_date,
                expiry_date: formData.expiry_date,
                alert_days_before: Number(formData.alert_days_before)
            });
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                company_id: '',
                document_type: '',
                document_number: '',
                issuing_authority: '',
                issue_date: '',
                expiry_date: '',
                alert_days_before: 30
            });
        } catch (error: any) {
            alert(error.message || 'Failed to create registration');
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title fw-bold">Add New Registration</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body p-4">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Company Name</label>
                                        <select
                                            className="form-select form-select-sm"
                                            name="company_id"
                                            value={formData.company_id}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Company</option>
                                            {companies.map(company => (
                                                <option key={company.id} value={company.id}>{company.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Registration / License</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="document_type"
                                            value={formData.document_type}
                                            onChange={handleChange}
                                            placeholder="e.g. GST Registration"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Regn./Licence Number</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="document_number"
                                            value={formData.document_number}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Regn./Licence Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            name="issuing_authority"
                                            value={formData.issuing_authority}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Applied On</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            name="issue_date"
                                            value={formData.issue_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Expiry Date</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            name="expiry_date"
                                            value={formData.expiry_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label small fw-semibold">Alert Before (Days)</label>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            name="alert_days_before"
                                            value={formData.alert_days_before}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light border-0">
                                <button type="button" className="btn btn-sm btn-secondary px-3" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-sm btn-primary px-4" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Save Registration'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
