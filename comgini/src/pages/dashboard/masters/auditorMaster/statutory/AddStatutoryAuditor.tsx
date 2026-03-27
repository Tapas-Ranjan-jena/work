import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import mastersService from "../../../../../services/mastersService"
import type { Company, CreateAuditorRequest } from "../../../../../types/masters.types"
import toast from "react-hot-toast"

export default function AddStatutoryAuditor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [formData, setFormData] = useState<CreateAuditorRequest>({
    company_id: 0,
    category: "statutory",
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
    designation: ""
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const response = await mastersService.getCompanies(1, 100)
      setCompanies(response.data)
    } catch (error: any) {
      console.error("Failed to fetch companies:", error)
      toast.error("Failed to load companies")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: CreateAuditorRequest) => ({
      ...prev,
      [name]: name === "company_id" ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.company_id) {
      toast.error("Please select a company")
      return
    }

    setLoading(true)
    try {
      await mastersService.createAuditor(formData)
      toast.success("Auditor added successfully")
      navigate(-1)
    } catch (error: any) {
      console.error("Failed to add auditor:", error)
      toast.error(error.message || "Failed to add auditor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid py-3">
      <form onSubmit={handleSubmit}>
        {/* ===== TITLE ROW ===== */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="m-0 fw-bold" style={{ color: "#2E388E" }}>Add Statutory Auditor</h5>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-sm shadow-sm"
            style={{ background: "#2E388E", color: "#fff" }}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        <div className="card border-0 shadow-sm p-4">
          {/* ===== COMPANY & CATEGORY ===== */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Select Company</label>
              <select 
                className="form-select"
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
              <label className="form-label small fw-bold">Category of Auditor</label>
              <select 
                className="form-select bg-light"
                name="category"
                value={formData.category}
                disabled
              >
                <option value="statutory">Statutory Auditor</option>
              </select>
            </div>
          </div>

          {/* ===== PARTICULARS OF FIRM ===== */}
          <div className="mb-3">
            <h6 className="fw-bold text-muted text-uppercase small border-bottom pb-2">Particulars of Firm</h6>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Firm Registration Number (FRN)</label>
              <input
                className="form-control"
                name="firm_registration_number"
                value={formData.firm_registration_number}
                onChange={handleChange}
                placeholder="FRN"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Name of Firm</label>
              <input
                className="form-control"
                name="firm_name"
                value={formData.firm_name}
                onChange={handleChange}
                placeholder="Firm Name"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">PAN</label>
              <input
                className="form-control"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                placeholder="PAN"
                required
              />
            </div>

            <div className="col-lg-6 col-md-6">
              <label className="form-label small">Firm Email ID</label>
              <input
                type="email"
                className="form-control"
                name="firm_email"
                value={formData.firm_email}
                onChange={handleChange}
                placeholder="firm@example.com"
                required
              />
            </div>

            <div className="col-lg-6 col-md-6">
              <label className="form-label small">Address</label>
              <input
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Firm Address"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Country</label>
              <input 
                className="form-control bg-light"
                name="country"
                value={formData.country}
                readOnly
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">State</label>
              <input 
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">City</label>
              <input 
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
          </div>

          {/* ===== PARTNER'S NUMBER SECTION ===== */}
          <div className="mb-3">
            <h6 className="fw-bold text-muted text-uppercase small border-bottom pb-2">Auditor / Partner Details</h6>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-lg-6 col-md-6">
              <label className="form-label small">Membership Number</label>
              <input
                className="form-control"
                name="membership_number"
                value={formData.membership_number}
                onChange={handleChange}
                placeholder="Membership No."
                required
              />
            </div>

            <div className="col-lg-6 col-md-6">
              <label className="form-label small">Name of Auditor</label>
              <input
                className="form-control"
                name="auditor_name"
                value={formData.auditor_name}
                onChange={handleChange}
                placeholder="Auditor Name"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Mobile Number</label>
              <input
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="auditor@example.com"
                required
              />
            </div>

            <div className="col-lg-4 col-md-6">
              <label className="form-label small">Designation</label>
              <input
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation (e.g. Partner)"
                required
              />
            </div>
          </div>

          {/* ===== SUBMIT ===== */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-5"
              style={{ background: "#2E388E", border: "none" }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : "Submit Auditor Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}