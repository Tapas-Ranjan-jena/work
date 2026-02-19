import { useNavigate } from "react-router-dom"

export default function DIR8MBP1() {

  const navigate = useNavigate()

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB + BACK ================= */}
        <div className="d-flex justify-content-between align-items-center">

          <small className="text-muted">
            Home / Director / DIR-8 / MBP-1
          </small>

          <button
            onClick={() => navigate("/masters/director-kmp")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"white"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>

        </div>

        {/* ================= SELECT ROW ================= */}
        <div className="row g-3 mt-2">
          <div className="col-md-6">
            <select className="form-select">
              <option>Select Company</option>
            </select>
          </div>

          <div className="col-md-6">
            <select className="form-select">
              <option>Select Director</option>
            </select>
          </div>
        </div>

        {/* ================= DOWNLOAD DIR8 TABLE ================= */}
        <div className="mt-3">

          <small className="fw-semibold d-block mb-1">
            Download DIR-8 / MBP-1
          </small>

          <table className="table table-bordered">

            <thead style={{background:"#F5F5F6"}}>
              <tr>
                <th>Date</th>
                <th>Place</th>
                <th>Companies</th>
                <th>DIR - 8</th>
                <th>MBP - 1</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input className="form-control" placeholder="d/m/y"/>
                </td>

                <td>
                  <input className="form-control" placeholder="Place"/>
                </td>

                <td>
                  <select className="form-select">
                    <option>--Select--</option>
                  </select>
                </td>

                {/* ⭐ ICONS EXACTLY LIKE IMAGE */}
                <td className="text-center">
                  <i className="bi bi-eye me-2"></i>
                  <i className="bi bi-file-earmark-pdf text-danger"></i>
                </td>

                <td className="text-center">
                  <i className="bi bi-eye me-2"></i>
                  <i className="bi bi-file-earmark-pdf text-danger"></i>
                </td>
              </tr>
            </tbody>

          </table>

        </div>

        {/* ================= DIRECTOR INTEREST SECTION ================= */}
        <div className="mt-3">

          <small className="fw-semibold d-block mb-1">
            Director’s Interest / Relative report
          </small>

          <table className="table table-bordered">

            <thead style={{background:"#ffffff"}}>
              <tr>
                <th>Event Date</th>
                <th>Director</th>
                <th>Content to be viewed</th>
                <th>Signing</th>
                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <input className="form-control" placeholder="d/m/y"/>
                </td>

                <td>
                  <select className="form-select">
                    <option>Select Director</option>
                  </select>
                </td>

                <td>
                  <select className="form-select">
                    <option>All</option>
                  </select>
                </td>

                <td>
                  <select className="form-select">
                    <option>Without Signing</option>
                  </select>
                </td>

                {/* ⭐ ICONS ONLY IN DOWNLOAD */}
                <td className="text-center">
                  <i className="bi bi-eye me-2"></i>
                  <i className="bi bi-file-earmark-pdf text-danger"></i>
                </td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
