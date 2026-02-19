import { useOutletContext } from "react-router-dom"
import PageTopBar from "../../../components/common/PageTopBar"

export default function RequestedDocuments() {

  // ⭐ RECEIVE SIDEBAR CONTROL FROM DASHBOARD LAYOUT
  const { setOpen } = useOutletContext<any>()

  return (
    <div className="container-fluid">

      {/* ⭐ REUSABLE TOP BAR */}
      <PageTopBar onMenuClick={() => setOpen((prev:boolean) => !prev)} />

      <div className="card p-3">

        <small className="text-muted mb-2">
          Home / Requested Documents
        </small>

        <h6 className="mb-3">Requested Documents</h6>

        <div className="d-flex justify-content-end mb-2">
          <input
            className="form-control form-control-sm"
            placeholder="Search"
            style={{ width: "180px" }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Requested by</th>
                <th>Requested on</th>
                <th>Company Name</th>
                <th>Financial Year</th>
                <th>File Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} className="text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <small className="mt-2 text-muted">
          Showing 0 to 0 of 0 entries
        </small>

      </div>

    </div>
  )
}
