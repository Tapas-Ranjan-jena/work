import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import registrationService from '../../../../services/registrationService';
import api from '../../../../api/api';
import type { ApiResponse } from '../../../../services/clients/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddRegistrationModal({ open, onClose, onSuccess }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
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
    if (open) {
      fetchCompanies();
    }
  }, [open]);

  const fetchCompanies = async () => {
    try {
      const response = await api.get<ApiResponse<any[]>>('/companies');
      setCompanies(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch companies', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Resolve company name to ID if possible
      const selectedCompany = companies.find(c => c.name.toLowerCase() === formData.company_id.toLowerCase());
      const companyId = selectedCompany ? Number(selectedCompany.id) : Number(formData.company_id);

      if (isNaN(companyId)) {
        throw new Error('Please select a valid company or enter a valid Company ID');
      }

      await registrationService.createRegistration({
        company_id: companyId,
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

  if (!open) return null;

  return createPortal(
    <div
      className="modal d-block"
      style={{
        background: "#00000066",
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        overflowY: "auto",
      }}
    >
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        <div className="modal-dialog" style={{ maxWidth: "1100px", width: "100%" }}>
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-light">
              <h5 className="fw-semibold m-0">Add Registration</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4">
                <div className="row g-4">
                  {/* ===== LEFT COLUMN ===== */}
                  <div className="col-lg-6 col-12">
                    <label className="form-label small fw-semibold">Company id</label>
                    <input
                      list="companyOptions"
                      className="form-control mb-3"
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                      placeholder="Type or select company..."
                      required
                    />
                    <datalist id="companyOptions">
                      {companies.map(company => (
                        <option key={company.id} value={company.name} />
                      ))}
                    </datalist>

                    <label className="form-label small fw-semibold text-muted">Status (Auto-handled)</label>
                    <select className="form-select mb-3 bg-light" disabled>
                      <option>Active</option>
                    </select>

                    <label className="form-label small fw-semibold">Regn./Licence Name</label>
                    <input
                      className="form-control mb-3"
                      placeholder="Regn./Licence Name"
                      name="issuing_authority"
                      value={formData.issuing_authority}
                      onChange={handleChange}
                      required
                    />

                    <label className="form-label small fw-semibold text-muted">Regn./Licence Type (Auto-handled)</label>
                    <select className="form-select mb-3 bg-light" disabled>
                      <option>Select</option>
                    </select>

                    <label className="form-label small fw-semibold">Expiry date</label>
                    <input
                      type="date"
                      className="form-control mb-3"
                      name="expiry_date"
                      value={formData.expiry_date}
                      onChange={handleChange}
                      required
                    />

                    <label className="form-label small fw-semibold text-muted">Alert User (Optional)</label>
                    <input className="form-control bg-light" placeholder="Alert User" disabled />
                  </div>

                  {/* ===== RIGHT COLUMN ===== */}
                  <div className="col-lg-6 col-12">
                    <label className="form-label small fw-semibold">Registration / License</label>
                    <input
                      className="form-control mb-3"
                      placeholder="e.g. GST Registration"
                      name="document_type"
                      value={formData.document_type}
                      onChange={handleChange}
                      required
                    />

                    <label className="form-label small fw-semibold">Applied On</label>
                    <input
                      type="date"
                      className="form-control mb-3"
                      name="issue_date"
                      value={formData.issue_date}
                      onChange={handleChange}
                      required
                    />

                    <label className="form-label small fw-semibold">Regn./Licence Number</label>
                    <input
                      className="form-control mb-3"
                      placeholder="Regn./Licence Number"
                      name="document_number"
                      value={formData.document_number}
                      onChange={handleChange}
                      required
                    />

                    <label className="form-label small fw-semibold text-muted">Valid Form (Optional)</label>
                    <input className="form-control mb-3 bg-light" placeholder="Valid Form" disabled />

                    <label className="form-label small fw-semibold text-muted">Key Terms (Optional)</label>
                    <input className="form-control mb-3 bg-light" placeholder="Key Terms" disabled />

                    <label className="form-label small fw-semibold">Alert Before (Days)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="alert_days_before"
                      value={formData.alert_days_before}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* ===== REMARKS FULL WIDTH ===== */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Remarks (Optional)</label>
                    <textarea
                      className="form-control bg-light"
                      rows={4}
                      placeholder="Remarks"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-between bg-light border-0">
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) console.log("Selected:", file.name)
                  }}
                />

                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() => fileRef.current?.click()}
                  disabled={isLoading}
                >
                  <i className="bi bi-camera me-1"></i>
                  Upload File
                </button>

                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={isLoading}>
                    <i className="bi bi-x-circle me-1"></i>
                    Close
                  </button>

                  <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                    <i className="bi bi-check-circle me-1"></i>
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
