import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import mastersService from "../../../../../services/mastersService"
import type { Company, CreateAuditorRequest } from "../../../../../types/masters.types"
import toast from "react-hot-toast"

export default function AddInternalAuditor() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateAuditorRequest>({
    company_id: 0,
    category: "internal",
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
    designation: "Partner"
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      const resp = await mastersService.getCompanies(1, 100)
      setCompanies(resp.data)
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
      toast.success("Internal Auditor added successfully")
      navigate(-1)
    } catch (error: any) {
      toast.error(error.message || "Failed to add auditor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h5 className="m-0 fw-bold text-dark">Add Internal Auditor</h5>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-outline-secondary px-3 shadow-sm"
        >
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
        <div className="row g-3">
          <div className="col-12 mb-3">
            <label className="form-label small fw-bold">Select Company <span className="text-danger">*</span></label>
            <select
              name="company_id"
              className="form-select"
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

          <div className="col-md-4">
            <label className="form-label small fw-bold">FRN</label>
            <input
              name="firm_registration_number"
              className="form-control"
              placeholder="Firm Registration Number"
              value={formData.firm_registration_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Name of Firm</label>
            <input
              name="firm_name"
              className="form-control"
              placeholder="Name of Firm"
              value={formData.firm_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">PAN</label>
            <input
              name="pan"
              className="form-control"
              placeholder="PAN"
              value={formData.pan}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Firm Email ID</label>
            <input
              name="firm_email"
              type="email"
              className="form-control"
              placeholder="Firm Email ID"
              value={formData.firm_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Address</label>
            <input
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Country</label>
            <input
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">State</label>
            <input
              name="state"
              className="form-control"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">City</label>
            <input
              name="city"
              className="form-control"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Membership Number</label>
            <input
              name="membership_number"
              className="form-control"
              placeholder="Membership Number"
              value={formData.membership_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small fw-bold">Name of Auditor</label>
            <input
              name="auditor_name"
              className="form-control"
              placeholder="Name of Auditor"
              value={formData.auditor_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Mobile Number</label>
            <input
              name="mobile"
              className="form-control"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small fw-bold">Designation</label>
            <input
              name="designation"
              className="form-control"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn px-4 shadow-sm"
              style={{ background: "#2E388E", color: "#fff" }}
            >
              {loading ? "Submitting..." : "Submit Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}