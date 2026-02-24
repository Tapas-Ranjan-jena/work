import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ImportExcelModal from "../modals/ImportExcelModal"   // ⭐ adjust path if needed

export default function AddChecklist() {

  const navigate = useNavigate()

  // ⭐ MODAL STATE
  const [openImport, setOpenImport] = useState(false)

  return (
    <div className="card border-0 p-3">

      {/* ⭐ HEADER */}
      <div className="d-flex justify-content-between mb-3">
        <h6 className="fw-semibold">Add Checklist</h6>

        <div className="d-flex gap-2">
          {/* ✅ IMPORT EXCEL WORKING */}
          <button
            onClick={() => setOpenImport(true)}
            className="btn btn-sm text-white"
            style={{ background:"#2E388E" }}
          >
            Import Excel
          </button>

          <button
            className="btn btn-sm text-white"
            style={{ background:"#2E388E" }}
          >
            Download Template
          </button>

          {/* ✅ BACK NAVIGATION FIX */}
          <button
            onClick={() => navigate("/checklist")}
            className="btn btn-sm text-white"
            style={{ background:"#2E388E" }}
          >
            Back
          </button>
        </div>
      </div>

      {/* ⭐ TITLE INPUT */}
      <label className="mb-1">Checklist Title</label>
      <input className="form-control mb-3"/>

      {/* ⭐ TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Particulars</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* ⭐ ROW BUTTONS */}
      <div className="d-flex gap-2">
        <button className="btn btn-sm text-white" style={{background:"#2E388E"}}>
          Add Row
        </button>

        <button className="btn btn-sm text-white" style={{background:"#2E388E"}}>
          Remove Row
        </button>
      </div>

      {/* ⭐ SUBMIT */}
      <button className="btn btn-sm mt-3 text-white" style={{background:"#2E388E"}}>
        Submit
      </button>

      {/* ⭐ IMPORT EXCEL MODAL */}
      <ImportExcelModal
        show={openImport}
        onClose={() => setOpenImport(false)}
      />

    </div>
  )
}