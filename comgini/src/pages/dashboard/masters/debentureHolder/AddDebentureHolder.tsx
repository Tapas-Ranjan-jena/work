import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mastersService from "../../../../services/mastersService";
import toast from "react-hot-toast";

export default function AddDebentureHolder(){

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    importType: "Fresh",
    director: "", category: "", subCategory: "", underSubCategory: "",
    name: "", fatherName: "", motherName: "",
    addressLine1: "", country: "", state: "", city: "", pinCode: "",
    gender: "", pan: "", dob: "", aadhar: "", nationality: "", voterId: "",
    email: "", mobile: "", maritalStatus: "", spouseName: "", occupation: "", guardianName: "",
    cinLlpin: "", incorporationDate: "",
    company_id: null
  });
  
  const [panDocument, setPanDocument] = useState<File | null>(null);
  const [aadharDocument, setAadharDocument] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetchDebentureHolder();
    }
  }, [id]);

  const fetchDebentureHolder = async () => {
    try {
      setLoading(true);
      const data = await mastersService.getDebentureHolderById(id!);
      setFormData({
        importType: "Fresh",
        director: data.director || "",
        category: data.category || "",
        subCategory: data.subCategory || "",
        underSubCategory: data.underSubCategory || "",
        name: data.debentureHolderName || data.name || "",
        fatherName: data.fatherName || "",
        motherName: data.motherName || "",
        addressLine1: data.addressLine1 || "",
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
        pinCode: data.pinCode || "",
        gender: data.gender || "",
        pan: data.pan || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        aadhar: data.aadhar || "",
        nationality: data.nationality || "",
        voterId: data.voterId || "",
        email: data.email || "",
        mobile: data.mobile || "",
        maritalStatus: data.maritalStatus || "",
        spouseName: data.spouseName || "",
        occupation: data.occupation || "",
        guardianName: data.guardianName || "",
        cinLlpin: data.cinLlpin || "",
        incorporationDate: data.incorporationDate ? data.incorporationDate.split("T")[0] : "",
        company_id: data.company_id || null
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch debenture holder data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
       setFormData(prev => ({ ...prev, [name]: value }));
    } else {
       setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      let payload: any = formData;
      let isMultipart = false;
      
      if (panDocument || aadharDocument) {
         isMultipart = true;
         payload = new FormData();
         Object.keys(formData).forEach(key => {
            if ((formData as any)[key] !== null && (formData as any)[key] !== undefined) {
                payload.append(key, (formData as any)[key]);
            }
         });
         if (panDocument) payload.append("panDocument", panDocument);
         if (aadharDocument) payload.append("aadharDocument", aadharDocument);
      }
      
      if (id) {
        await mastersService.updateDebentureHolder(id, payload, isMultipart);
        toast.success("Debenture holder updated successfully");
      } else {
        await mastersService.createDebentureHolder(payload, isMultipart);
        toast.success("Debenture holder created successfully");
      }
      navigate("/masters/debenture-holder");
    } catch (err: any) {
      toast.error(err.message || "Failed to save debenture holder");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="container-fluid">

      <div className="card p-3 shadow-sm border-0">

        {/* ================= BREADCRUMB ================= */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary" style={{cursor:"pointer"}} onClick={()=>navigate("/")}>Home</span>
          {" / "}
          <span className="text-primary" style={{cursor:"pointer"}} onClick={()=>navigate("/masters/debenture-holder")}>Debenture holder's Master</span>
          {" / "}
          {id ? "Edit" : "Add"} Debenture holder
        </small>

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0 fw-bold">{id ? "Edit" : "Add"} Debenture holder</h6>

          <button
            onClick={()=>navigate("/masters/debenture-holder")}
            className="btn btn-sm btn-outline-secondary d-flex align-items-center shadow-none"
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        {/* ================= IMPORT FROM ================= */}
        {!id && (
        <div className="border rounded p-3 mb-4 bg-light small d-flex align-items-center">
          <strong className="me-3">Import from:</strong>

          <div className="form-check form-check-inline me-4">
            <input className="form-check-input" type="radio" name="importType" id="importDir" value="Director" checked={formData.importType === "Director"} onChange={handleChange} />
            <label className="form-check-label" htmlFor="importDir">Director's Master</label>
          </div>

          <div className="form-check form-check-inline me-4">
            <input className="form-check-input" type="radio" name="importType" id="importShare" value="Shareholder" checked={formData.importType === "Shareholder"} onChange={handleChange} />
            <label className="form-check-label" htmlFor="importShare">Shareholder's Master</label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="importType" id="importFresh" value="Fresh" checked={formData.importType === "Fresh"} onChange={handleChange} />
            <label className="form-check-label" htmlFor="importFresh">Add Fresh Entry</label>
          </div>
        </div>
        )}

        {/* ================= FORM ================= */}
        <form className="row g-3" onSubmit={handleSubmit}>

          {/* FIRST ROW */}
          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1">Director</label>
            <select className="form-select form-select-sm" name="director" value={formData.director} onChange={handleChange}>
              <option value="">Select Director</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1">Category</label>
            <select className="form-select form-select-sm" name="category" value={formData.category} onChange={handleChange}>
              <option value="">Category</option>
              <option value="Individual">Individual</option>
              <option value="Body Corporate">Body Corporate</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1">Sub Category</label>
            <select className="form-select form-select-sm" name="subCategory" value={formData.subCategory} onChange={handleChange}>
               <option value="">Select</option>
              <option value="Non institutions">Non institutions</option>
              <option value="Institutions">Institutions</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1">Under Sub Category</label>
            <select className="form-select form-select-sm" name="underSubCategory" value={formData.underSubCategory} onChange={handleChange}>
               <option value="">Select</option>
              <option value="Individual">Individual</option>
            </select>
          </div>

          {/* NAME ROW */}
          <div className="col-12 col-md-4">
            <label className="fw-bold small mb-1 text-primary">Full Name / Debenture holder <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
          </div>

          <div className="col-12 col-md-4">
            <label className="fw-bold small mb-1">Father's Name</label>
            <input className="form-control form-control-sm" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Father's Name" />
          </div>

          <div className="col-12 col-md-4">
            <label className="fw-bold small mb-1">Mother's Name</label>
            <input className="form-control form-control-sm" name="motherName" value={formData.motherName} onChange={handleChange} placeholder="Mother's Name" />
          </div>

          {/* ADDRESS */}
          <div className="col-12 col-md-6">
            <label className="fw-bold small mb-1 text-primary">Add Line 1</label>
            <input className="form-control form-control-sm" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1 text-primary">Country</label>
            <input className="form-control form-control-sm" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1 text-primary">State</label>
            <input className="form-control form-control-sm" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">City</label>
            <input className="form-control form-control-sm" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1 text-primary">Pin Code</label>
            <input className="form-control form-control-sm" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" />
          </div>

          {/* PERSONAL INFO */}
          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">Gender</label>
            <select className="form-select form-select-sm" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">PAN</label>
            <input className="form-control form-control-sm" name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">DOB</label>
            <input type="date" className="form-control form-control-sm" name="dob" value={formData.dob} onChange={handleChange} placeholder="d/m/y"/>
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">Aadhar</label>
            <input className="form-control form-control-sm" name="aadhar" value={formData.aadhar} onChange={handleChange} placeholder="Aadhar" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">Nationality</label>
            <input className="form-control form-control-sm" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">Voter ID</label>
            <input className="form-control form-control-sm" name="voterId" value={formData.voterId} onChange={handleChange} placeholder="Voter ID" />
          </div>

          {/* CONTACT */}
          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1 text-primary">Email</label>
            <input type="email" className="form-control form-control-sm" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </div>

          <div className="col-12 col-md-3">
            <label className="fw-bold small mb-1 text-primary">Mobile</label>
            <input className="form-control form-control-sm" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
          </div>

          <div className="col-6 col-md-2">
            <label className="fw-bold small mb-1">Marital Status</label>
            <select className="form-select form-select-sm" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <option value="">Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="col-6 col-md-4">
            <label className="fw-bold small mb-1">Spouse's Name</label>
            <input className="form-control form-control-sm" name="spouseName" value={formData.spouseName} onChange={handleChange} placeholder="Spouse's Name" />
          </div>

          <div className="col-6 col-md-4">
            <label className="fw-bold small mb-1">Occupation</label>
            <input className="form-control form-control-sm" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" />
          </div>

          <div className="col-6 col-md-8">
            <label className="fw-bold small mb-1">Name of Guardian</label>
            <input className="form-control form-control-sm" name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="Guardian" />
          </div>

          {/* REGISTRATION */}
          <div className="col-12 col-md-6 border-top pt-3">
            <label className="fw-bold small mb-1 text-primary">CIN / Registration No.</label>
            <input className="form-control form-control-sm" name="cinLlpin" value={formData.cinLlpin} onChange={handleChange} placeholder="CIN" />
          </div>

          <div className="col-12 col-md-6 border-top pt-3">
            <label className="fw-bold small mb-1 text-primary">Date of Incorporation</label>
            <input type="date" className="form-control form-control-sm" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} placeholder="d/m/y"/>
          </div>

          {/* FILE UPLOADS */}
          <div className="col-12 col-md-6">
            <label className="fw-bold small mb-1">Select Pan</label>
            <input type="file" className="form-control form-control-sm" onChange={(e) => setPanDocument(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>

          <div className="col-12 col-md-6">
            <label className="fw-bold small mb-1">Select Aadhar</label>
            <input type="file" className="form-control form-control-sm" onChange={(e) => setAadharDocument(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>

          {/* SUBMIT */}
          <div className="col-12 mt-4 pt-3 border-top">
            <button
              type="submit"
              disabled={loading}
              className="btn px-5 shadow-sm text-center d-block w-100"
              style={{background:"#2b4cb3",color:"#fff", height: "40px"}}
            >
              {loading ? "Saving..." : (id ? "Update Debenture Holder" : "Save Debenture Holder")}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}