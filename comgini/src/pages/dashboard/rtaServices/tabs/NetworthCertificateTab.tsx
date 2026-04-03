import { useState } from "react"
import toast from "react-hot-toast"

export default function NetworthCertificateTab() {
  const [formData, setFormData] = useState({
    networth_as_on: "31/03/2023",
    paid_up_capital: "",
    reserve_surplus: "",
    accumulated_losses: "",
    misc_expenditure: "",
    total_networth: "0.00",
    outstanding_shares: "",
    book_value: "0.00",
    category: "Select Category",
    pcs_pca: "Select PCS",
    firm_name: "",
    firm_address: "",
    name_of_pcs_pca: "",
    membership_number: "",
    udin: "",
    email_id: "",
    contact_no: "",
    website: "",
    date_of_signing: "",
    place_of_signing: ""
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success("Networth details saved locally.")
  }

  return (
    <form onSubmit={handleSubmit} className="text-start">
      <div className="row g-0 border rounded overflow-hidden mb-5">
        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Net worth as on</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="networth_as_on"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.networth_as_on}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Paid up Capital</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="paid_up_capital"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.paid_up_capital}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Reserve & Surplus</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="reserve_surplus"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.reserve_surplus}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Accumulated losses, if any</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="accumulated_losses"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.accumulated_losses}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Miscellaneous Expenditure</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="misc_expenditure"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.misc_expenditure}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Total Net worth</div>
          <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border shadow-none bg-light fw-bold" value={formData.total_networth} disabled /></div>
        </div>

        <div className="col-md-6 border-end d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Total number of outstanding shares</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="outstanding_shares"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.outstanding_shares}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Book Value Per Share</div>
          <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border shadow-none bg-light fw-bold" value={formData.book_value} disabled /></div>
        </div>
      </div>

      <div className="mt-5 border rounded overflow-hidden">
        <div className="col-12 bg-light px-3 py-2 fw-bold border-bottom d-flex justify-content-between align-items-center">
            <span>Signing of Certificate</span>
            <a href="#" className="text-danger small fw-normal text-decoration-none px-2 mb-0" style={{ cursor: "pointer" }}>Click here to add PCS/CA firm master</a>
        </div>
        <div className="row g-0">
          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Category</div>
            <div className="flex-grow-1 p-2">
              <select name="category" className="form-select form-select-sm border shadow-none" value={formData.category} onChange={handleChange}>
                <option>Select Category</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-2 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "220px", fontSize: "11px" }}>Company Secretary / Chartered Accountant</div>
            <div className="flex-grow-1 p-2">
              <select name="pcs_pca" className="form-select form-select-sm border shadow-none" value={formData.pcs_pca} onChange={handleChange}>
                <option>Select PCS</option>
              </select>
            </div>
          </div>

          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Firm Name</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="firm_name"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.firm_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Address</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="firm_address"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.firm_address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6 border-end d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Name of PCS/PCA</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="name_of_pcs_pca"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.name_of_pcs_pca}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>UDIN</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="udin"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.udin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Email Id</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="email_id"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.email_id}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Contact No</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="contact_no"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.contact_no}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Website</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="website"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6 border-end d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Signing</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="date_of_signing"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                placeholder="d/m/Y"
                value={formData.date_of_signing}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Place of Signing</div>
            <div className="flex-grow-1 p-2">
              <input 
                name="place_of_signing"
                type="text" 
                className="form-control form-control-sm border shadow-none" 
                value={formData.place_of_signing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pb-5">
         <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" style={{ background: "#2b4cb3" }}>Submit</button>
      </div>
    </form>
  )
}
