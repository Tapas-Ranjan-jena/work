import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mastersService from "../../../../services/mastersService";
import toast from "react-hot-toast";

export default function AddShareholder(){

  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "", subCategory: "", underSubCategory: "",
    cinLlpin: "", registrationNo: "", incorporationDate: "",
    name: "", pan: "",
    addressLine1: "", country: "", state: "", city: "", pinCode: "",
    email: "", mobile: "", company_id: null
  });
  const [panDocument, setPanDocument] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetchShareholder();
    }
  }, [id]);

  const fetchShareholder = async () => {
    try {
      setLoading(true);
      const data = await mastersService.getShareholderById(id!);
      setFormData({
        category: data.category || "",
        subCategory: data.subCategory || "",
        underSubCategory: data.underSubCategory || "",
        cinLlpin: data.cinLlpin || "",
        registrationNo: data.registrationNo || "",
        incorporationDate: data.incorporationDate ? data.incorporationDate.split("T")[0] : "",
        name: data.shareholderName || data.name || "",
        pan: data.pan || "",
        addressLine1: data.addressLine1 || "",
        country: data.country || "",
        state: data.state || "",
        city: data.city || "",
        pinCode: data.pinCode || "",
        email: data.email || "",
        mobile: data.mobile || "",
        company_id: data.company_id || null
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch shareholder data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      let payload: any = formData;
      let isMultipart = false;
      
      if (panDocument) {
         isMultipart = true;
         payload = new FormData();
         Object.keys(formData).forEach(key => {
            if ((formData as any)[key] !== null) payload.append(key, (formData as any)[key]);
         });
         payload.append("panDocument", panDocument);
      }
      
      if (id) {
        await mastersService.updateShareholder(id, payload, isMultipart);
        toast.success("Shareholder updated successfully");
      } else {
        await mastersService.createShareholder(payload, isMultipart);
        toast.success("Shareholder created successfully");
      }
      navigate("/masters/shareholder");
    } catch (err: any) {
      toast.error(err.message || "Failed to save shareholder");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Shareholder / Particulars of Shareholder
        </small>

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
          <h6 className="m-0">Particulars of Shareholder</h6>

          <button
            onClick={()=>navigate("/masters/shareholder")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            ← Back
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form className="row g-3" onSubmit={handleSubmit}>

          {/* CATEGORY ROW */}
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
              <option value="">Category</option>
              <option value="Individual">Individual</option>
              <option value="Body Corporate">Body Corporate</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Sub Category</label>
            <input className="form-control" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Sub Category" />
          </div>

          <div className="col-md-4">
            <label className="form-label">Under Sub Category</label>
            <input className="form-control" name="underSubCategory" value={formData.underSubCategory} onChange={handleChange} placeholder="Under Sub Category" />
          </div>

          {/* CIN / REGISTRATION */}
          <div className="col-md-4">
            <label className="form-label">CIN/LLPIN</label>
            <input className="form-control" name="cinLlpin" value={formData.cinLlpin} onChange={handleChange} placeholder="CIN/LLPIN"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Unique Identification No/ Registration No.</label>
            <input className="form-control" name="registrationNo" value={formData.registrationNo} onChange={handleChange} placeholder="Unique Identification No/ Registration No."/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Date of incorporation/Reg.</label>
            <input type="date" className="form-control" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} placeholder="d/m/y"/>
          </div>

          {/* BODY CORPORATE */}
          <div className="col-md-8">
            <label className="form-label">Name of Body Corporate / Shareholder</label>
            <input className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>

          <div className="col-md-4">
            <label className="form-label">PAN</label>
            <input className="form-control" name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN"/>
          </div>

          {/* ADDRESS */}
          <div className="col-md-8">
            <label className="form-label">Add Line 1</label>
            <input className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Add Line 1"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Country</label>
            <input className="form-control" name="country" value={formData.country} onChange={handleChange} placeholder="Country"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input className="form-control" name="state" value={formData.state} onChange={handleChange} placeholder="State"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">City</label>
            <input className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="City"/>
          </div>

          <div className="col-md-4">
            <label className="form-label">Pin Code/ZIP Code</label>
            <input className="form-control" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code/ZIP Code"/>
          </div>

          {/* CONTACT */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
          </div>

          <div className="col-md-6">
            <label className="form-label">Mobile</label>
            <input className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile"/>
          </div>

          {/* FILE UPLOAD */}
          <div className="col-12">
            <label className="form-label">Select PAN Document</label>
            <input type="file" className="form-control" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                   setPanDocument(e.target.files[0]);
                }
            }}/>
          </div>

          {/* SUBMIT */}
          <div className="col-12 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}