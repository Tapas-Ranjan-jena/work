import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import mastersService from "../../../../../services/mastersService"
import type { Company, CreateAuditorRequest } from "../../../../../types/masters.types"
import toast from "react-hot-toast"

export default function AddSecretarialAuditor() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateAuditorRequest>({
    company_id: 0,
    category: "secretarial",
    firm_registration_number: "",
    firm_name: "",
    pan: "",
    firm_email: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    membership_number: "",
    auditor_name: "",
    mobile: "",
    email: "",
    designation: "Partner",
    certificate_of_practice: "",
    letterhead_type: "standard"
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const resp = await mastersService.getCompanies()
      setCompanies(resp.data) // Extract array from PaginatedResponse
    } catch (error) {
      console.error("Failed to fetch companies:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: name === "company_id" ? Number(value) : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company_id) return toast.error("Please select a company")

    setLoading(true)
    try {
      await mastersService.createAuditor(formData)
      toast.success("Secretarial Auditor added successfully")
      navigate(-1)
    } catch (error: any) {
      toast.error(error.message || "Failed to add auditor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid py-3">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h5 className="m-0 fw-bold text-dark">Particulars of Secretarial Auditor</h5>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-outline-secondary px-3"
        >
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-4">
            {/* COMPANY SELECTION */}
            <div className="col-12">
              <label className="form-label small fw-bold mb-1">Company <span className="text-danger">*</span></label>
              <select
                name="company_id"
                className="form-select shadow-sm"
                value={formData.company_id}
                onChange={handleChange}
                required
              >
                <option value={0}>Select Company</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* ================= PARTICULARS OF FIRM ================= */}
            <div className="col-12 mt-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="bg-primary opacity-10 p-1 rounded" style={{ width: "4px", height: "20px" }}></div>
                <h6 className="m-0 fw-bold text-uppercase small text-primary tracking-wider">Particulars of Firm</h6>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Name of Firm</label>
              <input
                name="firm_name"
                className="form-control shadow-sm"
                placeholder="Enter firm name"
                value={formData.firm_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Firm Registration Number</label>
              <input
                name="firm_registration_number"
                className="form-control shadow-sm"
                placeholder="Enter FRN"
                value={formData.firm_registration_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">PAN of Firm</label>
              <input
                name="pan"
                className="form-control shadow-sm"
                placeholder="Enter PAN"
                value={formData.pan}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Firm Email ID</label>
              <input
                name="firm_email"
                type="email"
                className="form-control shadow-sm"
                placeholder="Enter firm email"
                value={formData.firm_email}
                onChange={handleChange}
                required
              />
            </div>

            {/* ================= PARTICULARS OF AUDITOR ================= */}
            <div className="col-12 mt-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="bg-primary opacity-10 p-1 rounded" style={{ width: "4px", height: "20px" }}></div>
                <h6 className="m-0 fw-bold text-uppercase small text-primary tracking-wider">Particulars of Auditor</h6>
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Name of Auditor</label>
              <input
                name="auditor_name"
                className="form-control shadow-sm"
                placeholder="Enter auditor name"
                value={formData.auditor_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Designation in the firm</label>
              <select
                name="designation"
                className="form-select shadow-sm"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="Partner">Partner</option>
                <option value="Proprietor">Proprietor</option>
                <option value="Director">Director</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Membership Number</label>
              <input
                name="membership_number"
                className="form-control shadow-sm"
                placeholder="Enter membership number"
                value={formData.membership_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Certificate of Practice</label>
              <input
                name="certificate_of_practice"
                className="form-control shadow-sm"
                placeholder="Enter COP number"
                value={formData.certificate_of_practice}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Mobile Number</label>
              <input
                name="mobile"
                className="form-control shadow-sm"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold mb-1">Email ID</label>
              <input
                name="email"
                type="email"
                className="form-control shadow-sm"
                placeholder="Enter email ID"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* ADDRESS */}
            <div className="col-12 mt-4">
              <label className="form-label small fw-bold mb-1">Address of firm / Auditor</label>
              <textarea
                name="address"
                className="form-control shadow-sm"
                rows={2}
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold mb-1">Country</label>
              <input
                name="country"
                className="form-control shadow-sm"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold mb-1">State</label>
              <input
                name="state"
                className="form-control shadow-sm"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold mb-1">City</label>
              <input
                name="city"
                className="form-control shadow-sm"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            {/* ================= LETTER HEAD ================= */}
            <div className="col-12 mt-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="bg-primary opacity-10 p-1 rounded" style={{ width: "4px", height: "20px" }}></div>
                <h6 className="m-0 fw-bold text-uppercase small text-primary tracking-wider">Letter Head</h6>
              </div>
            </div>

            <div className="col-12 d-flex align-items-center gap-4 flex-wrap mb-2">
              <div className="form-check custom-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="letterhead_type"
                  id="standard"
                  value="standard"
                  checked={formData.letterhead_type === "standard"}
                  onChange={handleChange}
                />
                <label className="form-check-label small" htmlFor="standard">
                  Standard Letter Head
                </label>
              </div>

              <div className="form-check custom-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="letterhead_type"
                  id="custom"
                  value="custom"
                  checked={formData.letterhead_type === "custom"}
                  onChange={handleChange}
                />
                <label className="form-check-label small" htmlFor="custom">
                  Customize your own letter head
                </label>
              </div>

              <button
                type="button"
                className="btn btn-sm ms-auto btn-outline-primary px-3 shadow-sm"
              >
                <i className="bi bi-plus-circle me-1"></i>
                Add Partner
              </button>
            </div>

            {/* SUBMIT */}
            <div className="col-12 mt-4 pt-4 border-top">
              <button
                type="submit"
                disabled={loading}
                className="btn px-5 shadow-sm"
                style={{ background: "#2E388E", color: "#fff" }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : "Submit Details"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}