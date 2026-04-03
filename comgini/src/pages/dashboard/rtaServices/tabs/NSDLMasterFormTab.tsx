import { useState } from "react"
import toast from "react-hot-toast"

export default function NSDLMasterFormTab() {
  const [formData, setFormData] = useState({
    date: "",
    company_name: "",
    old_names: [{ id: 1, name: "", date: "" }],
    accept_old_shares: "No",
    date_of_inc: "",
    cin: "",
    business_activity: "",
    lei_code: "",
    class_of_company: "Private Limited",
    category_of_company: "Company limited by shares",
    sub_category_of_company: "Non-government company",
    reg_address: {
      line1: "",
      line2: "",
      line3: "",
      city: "",
      pin: "",
      state: "",
      country: "",
      website: "",
      email: ""
    },
    corr_address: {
      line1: "",
      line2: "",
      line3: "",
      city: "",
      pin: "",
      state: "",
      country: "",
      website: "",
      email: ""
    },
    kmp: [{ id: 1, name: "", designation: "", phone1: "", phone2: "", mobile: "", email: "" }],
    op: {
        cp1: { name: "", designation: "", phone1: "", phone2: "", mobile: "", email: "" },
        cp2: { name: "", designation: "", phone1: "", phone2: "", mobile: "", email: "" }
    },
    invoice_address: "Registered office address",
    pan: "",
    tan: "",
    gstin: "",
    bod: [{ id: 1, name: "", designation: "", din: "", pan: "", aadhaar: "" }],
    other_info: "",
    part2: {
        company_name: "",
        other_security_demat: "No",
        existing_isin: "",
        instruments: [
            { id: 1, type: "Fully paid-up shares", class: "", face_value: "", paid_up_value: "", count: "0", amount: "0" },
            { id: 2, type: "Partly paid-up shares", class: "", face_value: "", paid_up_value: "", count: "0", amount: "0" }
        ],
        partly_paid_isin_required: "No",
        cfi_details: [{ id: 1, type: "", voting: "Voting (each share has one vote)", ownership: "Free (unrestricted)", payment: "Fully paid" }],
        dn_details: [{ id: 1, type: "", from: "", to: "", count: "0" }],
        further_shares: "No",
        further_shares_details: [{ id: 1, nature: "", date: "", from: "", to: "", count: "0", type: "", paid_type: "" }],
        listing_status: "",
        exchange_name: "",
        rta_type: "SEBI Registered R&T Agent",
        rta_name: "MUDRA RTA VENTURES PRIVATE LIMITED",
        connectivity_type: "Only Electronic Connectivity",
        rta_address: {
            org_name: "",
            contact_person: "",
            designation: "",
            line1: "",
            line2: "",
            line3: "",
            city: "",
            pin: "",
            state: "",
            country: "",
            phone1: "",
            phone2: "",
            email: ""
        }
    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success("NSDL Master Form progress saved!")
  }

  const addOldNameRow = () => {
    setFormData(prev => ({
      ...prev,
      old_names: [...prev.old_names, { id: prev.old_names.length + 1, name: "", date: "" }]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="nsdl-form bg-white p-4 border rounded shadow-sm text-start" style={{ fontSize: "13px" }}>
      <div className="text-center mb-4">
        <h6 className="fw-bold text-decoration-underline">Application for admission as Issuer of Eligible Securities</h6>
        <p className="fw-bold mt-3"><u>Part I - Issuer Details</u></p>
      </div>

      <div className="mb-4">
        <p className="small fst-italic">Note: Please write "N.A." wherever not applicable. Affix stamp and initials in each page of the form.</p>
      </div>

      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">Date</span>
            <input type="text" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" style={{ width: "150px" }} />
        </div>
      </div>

      <div className="mb-5">
        <p className="mb-1 fw-bold">To,</p>
        <p className="mb-1 fw-bold">The Managing Director</p>
        <p className="mb-1 fw-bold">National Securities Depository Limited</p>
        <p className="mb-1 small">4th floor, Trade World, A Wing</p>
        <p className="mb-1 small">Kamala Mills Compound,</p>
        <p className="mb-1 small">Senapati Bapat Marg,</p>
        <p className="mb-1 small">Lower Parel,</p>
        <p className="mb-1 small">Mumbai - 400 013</p>
      </div>

      <div className="mb-5">
        <p>Dear Sir,</p>
        <p>We, as an issuer of securities, wish to apply for admission of securities issued by us as 'eligible securities' in the Depository System. The details of our Company are as given below.</p>
      </div>

      {/* 1. (a) Name of Company */}
      <div className="mb-4">
        <p className="fw-bold mb-2">1. (a) Name of the Company</p>
        <input 
            type="text" 
            className="form-control form-control-sm bg-light border shadow-none py-2" 
            placeholder="Name of the company will appear here"
        />
      </div>

      {/* 1. (b) Old Name(s) */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="fw-bold mb-0">(b) Old name(s) of the company in case company has previously changed its name</p>
            <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2" style={{ background: "#2b4cb3" }} onClick={addOldNameRow}>
                    <i className="bi bi-plus-lg"></i> Add row
                </button>
                <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2" style={{ background: "#2b4cb3" }}>
                    <i className="bi bi-trash"></i> Remove
                </button>
            </div>
        </div>
        <table className="table table-bordered table-sm small">
            <thead className="bg-light align-middle text-center">
                <tr>
                    <th style={{ width: "80px" }}>Sr. No.</th>
                    <th>Old Name (s)</th>
                    <th style={{ width: "250px" }}>Date of change in name, if any</th>
                </tr>
            </thead>
            <tbody>
                {formData.old_names.map((row, index) => (
                    <tr key={row.id}>
                        <td className="text-center align-middle">
                            <input type="checkbox" className="form-check-input me-2" /> {index + 1}
                        </td>
                        <td><input type="text" className="form-control form-control-sm border shadow-none" /></td>
                        <td><input type="text" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* 1. (c) Share certificates */}
      <div className="mb-5">
        <p className="fw-bold mb-2">(c) Share certificates bearing old name(s) of the company be accepted for dematerialization?</p>
        <div className="border rounded p-2" style={{ maxWidth: "200px" }}>
            <div className="d-flex justify-content-around bg-light py-1 fw-bold border-bottom mb-2">
                <span>Yes/No</span>
            </div>
            <div className="d-flex justify-content-around py-1">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="accept_old" id="yes" checked />
                    <label className="form-check-label" htmlFor="yes">Yes</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="accept_old" id="no" />
                    <label className="form-check-label" htmlFor="no">No</label>
                </div>
            </div>
        </div>
      </div>

      {/* 2. Corporate Information */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">2. Corporate Information</h6>
            <button className="btn btn-primary btn-sm px-4 fw-bold shadow-sm" style={{ background: "#2b4cb3" }}>Prefill From MCA</button>
        </div>
        <div className="border rounded overflow-hidden">
            <div className="row g-0 border-bottom">
                <div className="col-md-6 bg-light border-end px-3 py-2 fw-bold small">
                    (a) Date of Incorporation
                </div>
                <div className="col-md-6 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="Registration Date" />
                </div>
            </div>
            <div className="row g-0 border-bottom">
                <div className="col-md-6 bg-light border-end px-3 py-2 fw-bold small">
                    (b) Corporate Identity Number (CIN)
                </div>
                <div className="col-md-6 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none" placeholder="CIN Number" />
                </div>
            </div>
            <div className="row g-0 border-bottom">
                <div className="col-md-6 bg-light border-end px-3 py-2 fw-bold small">
                    (c) Main business activity along with code (as per MCA)
                </div>
                <div className="col-md-6 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none" />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-md-6 bg-light border-end px-3 py-2 fw-bold small">
                    (d) Legal Entity Identifier (LEI), if allotted
                </div>
                <div className="col-md-6 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none" />
                </div>
            </div>
        </div>
      </div>

      {/* 3. General Information */}
      <div className="mb-5">
        <h6 className="fw-bold mb-4">3. General information about the company</h6>
        
        {/* Class of Company */}
        <div className="row mb-4">
            <div className="col-md-4 fw-bold">Class of company:</div>
            <div className="col-md-4 text-primary fw-bold">Please select</div>
            <div className="col-md-4">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                        <span>Public Limited</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Private Limited</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Others (pls. specify)</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                </div>
            </div>
        </div>

        {/* Category of Company */}
        <div className="row mb-4">
            <div className="col-md-4 fw-bold">a) Category of company:</div>
            <div className="col-md-4 text-primary fw-bold">Please select</div>
            <div className="col-md-4">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                        <span>Company limited by shares</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Company limited by guarantee</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Unlimited company</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                </div>
            </div>
        </div>

        {/* Sub-category of Company */}
        <div className="row">
            <div className="col-md-4 fw-bold">Sub-category of company:</div>
            <div className="col-md-4 text-primary fw-bold">Please select</div>
            <div className="col-md-4">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                        <span>Union government company</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>State government company</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Non-government company</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Subsidiary of company incorporated out of India</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Guarantee and association company</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. Registered Office Address */}
      <div className="mb-5">
        <h6 className="fw-bold mb-3">4. Registered office address</h6>
        <div className="border rounded overflow-hidden">
            {[1, 2, 3].map(num => (
                <div key={num} className="row g-0 border-bottom">
                    <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">Address- Line {num}</div>
                    <div className="col-md-9 px-3 py-2">
                        <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                    </div>
                </div>
            ))}
            <div className="row g-0 border-bottom">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">City</div>
                <div className="col-md-3 px-3 py-2 border-end">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
                <div className="col-md-2 bg-light border-end px-3 py-2 fw-bold small">PIN</div>
                <div className="col-md-4 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
            <div className="row g-0 border-bottom">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">State</div>
                <div className="col-md-3 px-3 py-2 border-end">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
                <div className="col-md-2 bg-light border-end px-3 py-2 fw-bold small">Country</div>
                <div className="col-md-4 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
            <div className="row g-0 border-bottom">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">Website</div>
                <div className="col-md-9 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">Email ID</div>
                <div className="col-md-9 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
        </div>
      </div>

      {/* 5. Correspondence Address */}
      <div className="mb-5 pb-5">
        <h6 className="fw-bold mb-3">5. Correspondence address, if different than Registered office address</h6>
        <div className="border rounded overflow-hidden">
             {[1, 2, 3].map(num => (
                <div key={num} className="row g-0 border-bottom">
                    <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">Address- Line {num}</div>
                    <div className="col-md-9 px-3 py-2">
                        <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                    </div>
                </div>
            ))}
            <div className="row g-0 border-bottom">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">City</div>
                <div className="col-md-3 px-3 py-2 border-end">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
                <div className="col-md-2 bg-light border-end px-3 py-2 fw-bold small">PIN</div>
                <div className="col-md-4 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
            <div className="row g-0">
                <div className="col-md-3 bg-light border-end px-3 py-2 fw-bold small">State</div>
                <div className="col-md-3 px-3 py-2 border-end">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
                <div className="col-md-2 bg-light border-end px-3 py-2 fw-bold small">Country</div>
                <div className="col-md-4 px-3 py-2">
                    <input type="text" className="form-control form-control-sm border-0 shadow-none shadow-none" />
                </div>
            </div>
        </div>
      </div>

      {/* 6. Details of Key Management Personnel */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">6. Details of Key Management Personnel of the company</h6>
            <div className="d-flex gap-2">
                <button className="btn btn-primary btn-sm px-3 fw-bold shadow-none" style={{ background: "#2b4cb3" }}>Prefill From MCA</button>
                <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                    <i className="bi bi-plus-lg"></i> Add row
                </button>
                <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                    <i className="bi bi-trash"></i> Remove
                </button>
            </div>
        </div>
        <div className="table-responsive">
            <table className="table table-bordered table-sm small align-middle">
                <thead className="bg-light text-center">
                    <tr>
                        <th style={{ width: "50px" }}>Sr. No.</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Phone - 1</th>
                        <th>Phone - 2</th>
                        <th>Mobile</th>
                        <th>Email ID (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.kmp.map((row, index) => (
                        <tr key={row.id}>
                            <td className="text-center"><input type="checkbox" className="form-check-input me-2" /> {index + 1}</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* 7. Details of Operating Personnel */}
      <div className="mb-5">
        <h6 className="fw-bold mb-3">7. Details of Operating Personnel of the company</h6>
        <div className="table-responsive border rounded">
            <table className="table table-bordered table-sm mb-0 small">
                <thead className="bg-light fw-bold">
                    <tr>
                        <th style={{ width: "15%" }}>Particulars</th>
                        <th style={{ width: "42.5%" }}>Contact Person 1</th>
                        <th style={{ width: "42.5%" }}>Contact Person 2</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { label: "Name", key: "name" },
                        { label: "Designation", key: "designation" },
                        { label: "Phone - 1", key: "phone1" },
                        { label: "Phone - 2", key: "phone2" },
                        { label: "Mobile", key: "mobile" },
                        { label: "Email ID (s)", key: "email" }
                    ].map(field => (
                        <tr key={field.key}>
                            <td className="bg-light fw-bold px-3">{field.label}</td>
                            <td className="p-1"><input type="text" className="form-control form-control-sm border shadow-none" /></td>
                            <td className="p-1"><input type="text" className="form-control form-control-sm border shadow-none" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* 8. Details for Invoicing */}
      <div className="mb-5">
        <h6 className="fw-bold mb-3">8. Details for Invoicing</h6>
        <div className="row mb-4">
            <div className="col-md-4 fw-bold">Address to be used for raising Invoice</div>
            <div className="col-md-4 text-primary fw-bold">Please select</div>
            <div className="col-md-4">
                <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                        <span>i) Registered office address</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>ii) Correspondence address</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                </div>
            </div>
        </div>

        <p className="fw-bold mb-2 small">(a) Tax Registration Details</p>
        <div className="border rounded overflow-hidden mb-4">
            {[
                { label: "i) Permanent Account Number (PAN)", key: "pan" },
                { label: "ii) Tax Deduction and Collection Account Number (TAN)", key: "tan" },
                { label: "iii) Goods and Services Tax Identification Number (GSTIN)", key: "gstin" }
            ].map(tax => (
                <div key={tax.key} className="row g-0 border-bottom last-border-0">
                    <div className="col-md-5 bg-light border-end px-3 py-2 fw-bold small">{tax.label}</div>
                    <div className="col-md-7 p-1">
                        <input type="text" className="form-control form-control-sm border-0 shadow-none" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 9. Details of Board of Directors */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">9. Details of Board of Directors: (Please clearly identify Chairman, MD and Wholetime Director)</h6>
            <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                <i className="bi bi-plus-lg"></i> Add row
            </button>
        </div>
        <div className="table-responsive border rounded">
            <table className="table table-bordered table-sm mb-0 small align-middle">
                <thead className="bg-light text-center">
                    <tr>
                        <th style={{ width: "50px" }}>Sr. No.</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th style={{ width: "40%" }}>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.bod.map((row, index) => (
                        <tr key={row.id}>
                            <td className="text-center"><input type="checkbox" className="form-check-input me-2" /> {index + 1}</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td className="p-0">
                                <div className="d-flex border-bottom">
                                    <div className="bg-light px-2 py-1 border-end small fw-bold" style={{ width: "100px" }}>DIN</div>
                                    <div className="flex-grow-1 px-2 py-1"><input type="text" className="form-control form-control-sm border-0 p-0 shadow-none" /></div>
                                </div>
                                <div className="d-flex border-bottom">
                                    <div className="bg-light px-2 py-1 border-end small fw-bold" style={{ width: "100px" }}>PAN</div>
                                    <div className="flex-grow-1 px-2 py-1"><input type="text" className="form-control form-control-sm border-0 p-0 shadow-none" /></div>
                                </div>
                                <div className="d-flex">
                                    <div className="bg-light px-2 py-1 border-end small fw-bold" style={{ width: "100px" }}>AADHAAR</div>
                                    <div className="flex-grow-1 px-2 py-1"><input type="text" className="form-control form-control-sm border-0 p-0 shadow-none" /></div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* 10. Any other information */}
      <div className="mb-5">
        <h6 className="fw-bold mb-2">10. Any other information the applicant may wish to furnish:</h6>
        <textarea className="form-control border shadow-none" rows={4}></textarea>
      </div>

      <div className="mb-5">
        <p className="small">We hereby certify that the information provided is correct to the best of our knowledge and that we have attached all the enclosures. Further, we agree to be bound by the Bye Laws and Business Rules of NSDL.</p>
      </div>

      <div className="mb-5 border rounded p-4">
        <h6 className="fw-bold mb-4">Signature of authorized signatory</h6>
        <div className="row g-4">
            <div className="col-md-6">
                <select className="form-select border shadow-none">
                    <option>Select Director</option>
                </select>
            </div>
            <div className="col-12"></div>
            <div className="col-md-6 d-flex align-items-center gap-3">
                <span className="fw-bold">Place:</span>
                <input type="text" className="form-control border shadow-none" />
            </div>
            <div className="col-md-6 d-flex align-items-center gap-3">
                <span className="fw-bold">Date:</span>
                <input type="text" className="form-control border shadow-none" placeholder="d/m/Y" />
            </div>
        </div>
      </div>

      {/* ================= PART II ================= */}
      <div className="mt-5 border-top pt-5">
        <div className="text-center mb-5">
            <h6 className="fw-bold text-decoration-underline">Application for admission as Issuer of Eligible Securities</h6>
            <p className="fw-bold mt-3"><u>Part II – Security Details for Equity Shares</u></p>
        </div>

        <div className="d-flex justify-content-end align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
                <span className="fw-bold">Date</span>
                <input type="text" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" style={{ width: "150px" }} />
            </div>
        </div>

        <div className="mb-4">
            <p className="fw-bold mb-2">1. (a) Name of the Company</p>
            <input type="text" className="form-control form-control-sm bg-light border shadow-none py-2" placeholder="Name of company" />
        </div>

        <div className="mb-4">
            <p className="fw-bold mb-2">(b) Whether any other security of the company is already available in dematerialised form?</p>
            <div className="border rounded p-2" style={{ maxWidth: "200px" }}>
                <div className="d-flex justify-content-around bg-light py-1 fw-bold border-bottom mb-2">
                    <span>Yes/No</span>
                </div>
                <div className="d-flex justify-content-around py-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sec_demat" checked />
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="sec_demat" />
                        <label className="form-check-label">No</label>
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-5 d-flex align-items-center gap-3">
            <p className="fw-bold mb-0">(c) If yes, mention ISIN (any one)</p>
            <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "300px" }} />
        </div>

        {/* 2. (a) Instrument Details */}
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">2. (a) Instrument Details:</h6>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-plus-lg"></i> Add row
                    </button>
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div className="table-responsive border rounded">
                <table className="table table-bordered table-sm mb-0 small align-middle text-center">
                    <thead className="bg-light">
                        <tr>
                            <th style={{ width: "40px" }}>Sr. No.</th>
                            <th style={{ width: "120px" }}>Type of Equity Shares</th>
                            <th>Class (If any)</th>
                            <th style={{ width: "120px" }}>Face value per share (in Rs.) (a)</th>
                            <th style={{ width: "120px" }}>Paid-up value per share (in Rs.) (b)</th>
                            <th style={{ width: "120px" }}>Number of shares outstanding as on date (c)</th>
                            <th style={{ width: "150px" }}>Nominal Amount of outstanding shares (b x c)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /> 1</td>
                            <td className="text-start px-2">Fully paid-up shares</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" value="0" /></td>
                            <td className="bg-light"><input type="text" className="form-control form-control-sm border-0 shadow-none bg-transparent text-center fw-bold" value="0" disabled /></td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /> 2</td>
                            <td className="text-start px-2">Partly paid-up shares</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" value="0" /></td>
                            <td className="bg-light"><input type="text" className="form-control form-control-sm border-0 shadow-none bg-transparent text-center fw-bold" value="0" disabled /></td>
                        </tr>
                        <tr className="fw-bold">
                            <td colSpan={5} className="text-end px-3 bg-light">Total</td>
                            <td className="bg-light">0</td>
                            <td className="bg-light">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="small text-muted mt-2 fst-italic">Note: In case more than one class for each type of equity shares; give details of such classes separately and add rows above, if required.</p>
        </div>

        <div className="mb-5">
            <p className="fw-bold mb-2">(b) Whether ISIN for Partly Paid-up shares is required?</p>
            <div className="border rounded p-2" style={{ maxWidth: "200px" }}>
                <div className="d-flex justify-content-around bg-light py-1 fw-bold border-bottom mb-2">
                    <span>Yes/No</span>
                </div>
                <div className="d-flex justify-content-around py-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="partly_isin" />
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="partly_isin" checked />
                        <label className="form-check-label">No</label>
                    </div>
                </div>
            </div>
        </div>

        {/* CFI Code Section */}
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">(c) Details for Classification of Financial Instrument (CFI) Code:</h6>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-plus-lg"></i> Add row
                    </button>
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
            <p className="small text-muted mb-3">Kindly indicate (Yes/No) against relevant row. Only one option can be selected from the given options in each group.</p>
            <div className="table-responsive border rounded">
                <table className="table table-bordered table-sm mb-0 small align-middle text-center" style={{ minWidth: "1000px" }}>
                    <thead className="bg-light">
                        <tr>
                            <th rowSpan={2} style={{ width: "40px" }}>Sr. No.</th>
                            <th rowSpan={2} style={{ width: "120px" }}>Type of Equity Shares/Class</th>
                            <th colSpan={4}>Group 1</th>
                            <th colSpan={2}>Group 2</th>
                            <th colSpan={3}>Group 3</th>
                        </tr>
                        <tr>
                            <th colSpan={4} className="fw-normal" style={{ fontSize: "11px" }}>Voting right (indicates the kind of voting power conferred to the shareholder)</th>
                            <th colSpan={2} className="fw-normal" style={{ fontSize: "11px" }}>Ownership/transfer/sales restrictions (the ownership or transfer of the security is subject to special conditions including country specific restrictions)</th>
                            <th colSpan={3} className="fw-normal" style={{ fontSize: "11px" }}>Payment status</th>
                        </tr>
                        <tr>
                            <th colSpan={2}></th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Voting (each share has one vote)</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Non-voting (the shareholder has no voting right)</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Restricted voting (the shareholder may be entitled to less than one vote per share)</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Enhanced voting (the shareholder is entitled to more than one vote per share)</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Restrictions</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Free (unrestricted)</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Nil paid</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Partly paid</th>
                            <th style={{ width: "100px", fontSize: "10px" }}>Fully paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /> 1</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            <td><input type="checkbox" className="form-check-input" checked /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" checked /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" /></td>
                            <td><input type="checkbox" className="form-check-input" checked /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="small text-muted mt-2 fst-italic">Note: In case more than one class for each type of equity shares, add rows above if required.</p>
        </div>

        {/* 3. Distinctive Number (DN) details */}
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">3. Distinctive Number (DN) details (for outstanding shares only):</h6>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-plus-lg"></i> Add row
                    </button>
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div className="table-responsive border rounded">
                <table className="table table-bordered table-sm mb-0 small align-middle text-center">
                    <thead className="bg-light">
                        <tr>
                            <th style={{ width: "40px" }}>Sr. No.</th>
                            <th>Type of Equity Shares/Class</th>
                            <th colSpan={2}>Distinctive Numbers</th>
                            <th style={{ width: "150px" }}>Number of shares [(b-a)+1]</th>
                        </tr>
                        <tr>
                            <th colSpan={2}></th>
                            <th style={{ width: "150px" }}>From (a)</th>
                            <th style={{ width: "150px" }}>To (b)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /> 1</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td className="bg-light align-middle fw-bold">0</td>
                        </tr>
                        <tr className="fw-bold bg-light">
                            <td colSpan={4} className="text-end px-3">Total</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="small text-muted mt-2 fst-italic">Note: The number of shares as on date as shown above must match with the number of shares outstanding as provided above at clause 1 (a) above at Instrument Details. In case any shares of the company are cancelled earlier for any reason including forfeiture of shares, the distinctive numbers of such shares must be excluded from the above table.</p>
        </div>

        {/* 4. Further Shares */}
        <div className="mb-5">
            <h6 className="fw-bold mb-3">4. (a) Whether any further shares issued after the end of last financial year?</h6>
            <div className="border rounded p-2 mb-4" style={{ maxWidth: "200px" }}>
                <div className="d-flex justify-content-around bg-light py-1 fw-bold border-bottom mb-2">
                    <span>Yes/No</span>
                </div>
                <div className="d-flex justify-content-around py-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="further_shares" />
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="further_shares" checked />
                        <label className="form-check-label">No</label>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">(b) If yes, provide details in following table.</h6>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-plus-lg"></i> Add row
                    </button>
                    <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-none" style={{ background: "#2b4cb3" }}>
                        <i className="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div className="table-responsive border rounded">
                <table className="table table-bordered table-sm mb-0 small align-middle text-center">
                    <thead className="bg-light">
                        <tr>
                            <th rowSpan={2} style={{ width: "40px" }}>Sr. No.</th>
                            <th rowSpan={2}>Nature of the Issue (Private Placement, Bonus, Rights, etc.)</th>
                            <th rowSpan={2} style={{ width: "120px" }}>Date of Allotment</th>
                            <th colSpan={3}>Distinctive Number</th>
                            <th rowSpan={2} style={{ width: "120px" }}>Type of Equity Shares/Class</th>
                            <th rowSpan={2} style={{ width: "120px" }}>Fully /Partly paid-up</th>
                        </tr>
                        <tr>
                            <th style={{ width: "100px" }}>From</th>
                            <th style={{ width: "100px" }}>To</th>
                            <th style={{ width: "100px" }}>Number of shares</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" className="form-check-input" /> 1</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" placeholder="d/m/Y" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none text-center" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* 5. Status of Listing */}
        <div className="mb-5">
            <h6 className="fw-bold mb-4">5. Status of Listing:</h6>
            <div className="mb-4 d-flex align-items-center gap-3">
                <p className="fw-bold mb-0 small">a) State whether the shares of the company are listed/to be listed/unlisted:</p>
                <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "200px" }} />
            </div>
            <div className="mb-4 d-flex align-items-center gap-3">
                <p className="fw-bold mb-0 small">b) If listed/to be listed, mention name of Stock Exchange (s) where the shares of the company are listed/to be listed:</p>
                <input type="text" className="form-control form-control-sm border shadow-none" style={{ width: "200px" }} />
            </div>
        </div>

        {/* 6. Details of Registrar & Transfer Agent */}
        <div className="mb-5">
            <h6 className="fw-bold mb-4">6. Details of Registrar & Transfer Agent (R&T Agent)/In-house Registry division:</h6>
            <p className="fw-bold mb-2 small">a) Whether the company has in-house registry division or the company will appoint a SEBI Registered R&T Agent?</p>
            <div className="ps-4 mb-4">
                <p className="text-primary fw-bold mb-2 small">Please select</p>
                <div className="d-flex flex-column gap-2" style={{ width: "250px" }}>
                    <div className="d-flex justify-content-between">
                        <span className="small">In-house Registry Division</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="small">SEBI Registered R&T Agent</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                </div>
            </div>

            <div className="mb-4 d-flex align-items-center gap-3">
                <p className="fw-bold mb-0 small">b) Name of SEBI Registered R&T Agent:</p>
                <input type="text" className="form-control form-control-sm border shadow-none flex-grow-1" style={{ maxWidth: "500px" }} value="MUDRA RTA VENTURES PRIVATE LIMITED" />
            </div>

            <p className="fw-bold mb-2 small">c) Please specify type of connectivity with the R&T Agent:</p>
            <div className="ps-4 mb-4">
                <p className="text-primary fw-bold mb-2 small">Please select</p>
                <div className="d-flex flex-column gap-2" style={{ width: "250px" }}>
                    <div className="d-flex justify-content-between">
                        <span className="small">Single Point Connectivity [Physical + Electronic]</span>
                        <input type="checkbox" className="form-check-input" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="small">Only Electronic Connectivity</span>
                        <input type="checkbox" className="form-check-input" checked />
                    </div>
                </div>
            </div>

            <p className="fw-bold mb-3 small">d) Address where Depository Participants must send physical dematerialisation requests:</p>
            <div className="border rounded overflow-hidden">
                <table className="table table-bordered table-sm mb-0 small">
                    <thead className="bg-light">
                        <tr>
                            <th style={{ width: "30%" }}>Particulars</th>
                            <th style={{ width: "70%" }}>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { label: "Name of Organization", key: "org_name" },
                            { label: "Name of Contact Person", key: "contact_person" },
                            { label: "Designation of Contact Person", key: "designation" },
                            { label: "Address - Line 1", key: "line1" },
                            { label: "Address - Line 2", key: "line2" },
                            { label: "Address - Line 3", key: "line3" },
                        ].map(field => (
                            <tr key={field.key}>
                                <td className="px-3 py-2 bg-light fw-bold">{field.label}</td>
                                <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="px-3 py-2 bg-light fw-bold">City</td>
                            <td className="p-0">
                                <div className="d-flex border-bottom last-border-0 h-100">
                                    <div className="flex-grow-1 border-end"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                    <div className="bg-light px-3 py-2 fw-bold border-end" style={{ width: "100px" }}>PIN</div>
                                    <div className="flex-grow-1"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-3 py-2 bg-light fw-bold">State</td>
                            <td className="p-0">
                                <div className="d-flex border-bottom last-border-0 h-100">
                                    <div className="flex-grow-1 border-end"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                    <div className="bg-light px-3 py-2 fw-bold border-end" style={{ width: "100px" }}>Country</div>
                                    <div className="flex-grow-1"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-3 py-2 bg-light fw-bold">Phone - 1</td>
                            <td className="p-0">
                                <div className="d-flex border-bottom last-border-0 h-100">
                                    <div className="flex-grow-1 border-end"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                    <div className="bg-light px-3 py-2 fw-bold border-end" style={{ width: "100px" }}>Phone - 2</div>
                                    <div className="flex-grow-1"><input type="text" className="form-control form-control-sm border-0 shadow-none" /></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-3 py-2 bg-light fw-bold">Email ID</td>
                            <td><input type="text" className="form-control form-control-sm border-0 shadow-none" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* 7. Declaration */}
        <div className="mb-5 border-top pt-4">
            <h6 className="fw-bold mb-3">7. Declaration:</h6>
            <p className="fw-bold mb-2 small">We understand and agree that:</p>
            <div className="ps-3 mb-4">
                <p className="mb-1 small">(a) Shares on which calls have been made and are unpaid will not be eligible for demat.</p>
                <p className="small">(b) Partly paid shares, need to be identified separately with a separate ISIN.</p>
            </div>
            <p className="small mb-5">We hereby certify that the above information is correct to the best of our knowledge and that we have attached all the enclosures mentioned above. Further, we agree to be bound by the Bye Laws and Business Rules of NSDL.</p>
            
            <div className="row g-4 mb-5">
                <div className="col-md-6 border rounded p-3">
                    <div className="mb-4 d-flex align-items-center gap-3">
                        <span className="fw-bold small">Place:</span>
                        <input type="text" className="form-control border-bottom border-0 rounded-0 shadow-none" />
                    </div>
                    <div className="mb-4 d-flex align-items-center gap-3">
                        <span className="fw-bold small">Date:</span>
                        <input type="text" className="form-control border-bottom border-0 rounded-0 shadow-none" placeholder="d/m/Y" />
                    </div>
                    <div className="mb-4">
                        <span className="fw-bold small">Stamp</span>
                    </div>
                </div>
                <div className="col-md-6 border rounded p-3">
                    <p className="fw-bold small mb-4">Signature of authorised signatory</p>
                    <select className="form-select border shadow-none mb-3">
                        <option>Select Director</option>
                    </select>
                </div>
            </div>

            <div className="text-start">
               <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" style={{ background: "#2b4cb3" }}>Submit</button>
            </div>
        </div>
      </div>
    </form>
  )
}
