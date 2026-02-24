import { useState } from "react"
import SelectMCAUserModal from "./SelectMCAUserModal"

export default function RunLLPList() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="card border-0 p-3">

      {/* ⭐ FULL IMPORTANT NOTICE */}
      <div
        className="mb-3"
        style={{
          background: "#f4e3c1",
          borderLeft: "4px solid orange",
          padding: "14px"
        }}
      >
        <div className="fw-semibold mb-2">
          <i className="bi bi-exclamation-triangle text-danger me-2"></i>
          Important Notice
        </div>

        <small>
          Please review all forms and entered data carefully before submission.
          If you notice any missing information, unnecessary fields, or discrepancies,
          kindly reach out to us after completing the form.
          <br /><br />

          CompyRelaxis will not be held responsible for any issues arising due to
          frequent changes in MCA functionality. As MCA updates its systems regularly,
          some changes may not be immediately reflected on our software. While we
          continuously work to keep everything updated, occasional inconsistencies
          may occur.
        </small>

        <hr style={{ borderTop: "1px dashed #333" }} />

        <small className="text-danger">
          Re-submission is not supported on CompyRelaxis. If your form is under
          re-submission, please do not edit or submit it through CompyRelaxis.
        </small>

        <ul className="mb-1">
          <li>Create a new entry on the MCA portal.</li>
          <li>Prevent you from re-submitting the form on MCA portal.</li>
        </ul>

        <small>
          We cannot be held responsible for any additional charges or issues caused
          by such actions. Thank you for your understanding.
        </small>
      </div>

      {/* ⭐ HEADER (RESPONSIVE FIX) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
        <h6 className="fw-semibold m-0">Particulars of RUN-LLP</h6>

        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-sm text-white ms-auto ms-md-0"
          style={{ background: "#2E388E" }}
        >
          Prepare RUN-LLP
        </button>
      </div>

      {/* ⭐ SEARCH */}
      <div className="d-flex justify-content-end mb-2">
        <div className="position-relative w-100 w-sm-auto" style={{ maxWidth: "240px" }}>
          <input
            className="form-control form-control-sm ps-4"
            placeholder="Search"
          />
          <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2"></i>
        </div>
      </div>

      {/* ⭐ TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Purpose</th>
              <th>SRN of form</th>
              <th>MCA User</th>
              <th>Last updated on CR</th>
              <th>Last Submitted on MCA</th>
              <th>Action</th>
              <th>Auto Check on MCA</th>
              <th>Create New Form</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={9} className="text-center">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ⭐ TABLE FOOTER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-2 gap-2">
        <small>Showing 0 to 0 of 0 entries</small>

        <div>
          <button className="btn btn-sm btn-light border me-2">Previous</button>
          <button className="btn btn-sm btn-light border">Next</button>
        </div>
      </div>

      {/* ⭐ SCROLL BAR */}
      <div className="mt-2" style={{ height: "6px", background: "#ddd" }}>
        <div style={{ width: "60%", height: "100%", background: "#6c757d" }} />
      </div>

      <SelectMCAUserModal
        show={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  )
}