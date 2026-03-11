import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import registrationService from "../../../../../services/registrationService"
import api from "../../../../../api/api"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddExpiryModal({ open, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    company_id: '',
    document_type: '',
    document_number: 'N/A', // Default or auto-filled
    issuing_authority: 'N/A',
    issue_date: new Date().toISOString().split('T')[0],
    expiry_date: '',
    alert_days_before: '30'
  })

  const [companies, setCompanies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open) {
      const fetchCompanies = async () => {
        try {
          const response = await api.get('/clients?limit=100');
          if (response.data && response.data.data) {
            setCompanies(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch companies", error);
        }
      };
      fetchCompanies();
    }
  }, [open]);

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const selectedCompany = companies.find(c => c.name.toLowerCase() === formData.company_id.toLowerCase());
      const companyId = selectedCompany ? Number(selectedCompany.id) : Number(formData.company_id);

      if (isNaN(companyId)) {
        throw new Error('Please enter a valid Company ID or select a company');
      }

      await registrationService.createRegistration({
        ...formData,
        company_id: companyId,
        alert_days_before: Number(formData.alert_days_before)
      })
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error("Failed to add expiry", error)
      alert("Failed to save. Please check inputs.")
    } finally {
      setIsLoading(false)
    }
  }

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
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
      >
        <div className="modal-dialog" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-light">
              <h5 className="fw-semibold m-0">Add Expiry / Registration</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body px-4">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Company id</label>
                    <input
                      list="expiryCompanyOptions"
                      className="form-control"
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                      placeholder="Type company name or ID..."
                      required
                    />
                    <datalist id="expiryCompanyOptions">
                      {companies.map(c => <option key={c.id} value={c.name} />)}
                    </datalist>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Particulars (Document Type)</label>
                    <input
                      className="form-control"
                      name="document_type"
                      value={formData.document_type}
                      onChange={handleChange}
                      placeholder="e.g. GST Registration, Insurance Policy"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expiry_date"
                      value={formData.expiry_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Alert Days Before</label>
                    <input
                      type="number"
                      className="form-control"
                      name="alert_days_before"
                      value={formData.alert_days_before}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-white border px-4" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Expiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
