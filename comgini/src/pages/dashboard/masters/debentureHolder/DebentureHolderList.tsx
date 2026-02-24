import { useNavigate } from "react-router-dom"

export default function DebentureHolderList(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB ================= */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Debenture holder's Master
        </small>

        {/* ================= ACTION BUTTON ROW (ABOVE TITLE) ================= */}
        <div className="d-flex justify-content-end gap-2 mb-1">

          <button
            onClick={()=>navigate("/masters/debenture-holder/company-wise")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            Company wise Debenture holder’s list
          </button>

          <button
            onClick={()=>navigate("/masters/debenture-holder/add")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            + Add Debenture holder
          </button>

        </div>

        {/* ================= TITLE ================= */}
        <h6 className="m-0 mb-2">
          Debenture holder's List
        </h6>

        {/* ================= SHOW ROWS + SEARCH ================= */}
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div style={{position:"relative"}}>
            <i
              className="bi bi-search"
              style={{
                position:"absolute",
                left:"10px",
                top:"50%",
                transform:"translateY(-50%)",
                fontSize:"13px",
                color:"#888"
              }}
            />
            <input
              className="form-control form-control-sm"
              placeholder="Search"
              style={{width:"180px",paddingLeft:"28px"}}
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name of the Debenture holder</th>
                <th>Father's Name</th>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Under Sub Category</th>
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

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between mt-2">
          <small>Showing 0 to 0 of 0 entries</small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Previous</button>
            <button className="btn btn-light btn-sm">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}