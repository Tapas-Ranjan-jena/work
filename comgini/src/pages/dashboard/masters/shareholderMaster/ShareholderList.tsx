import { useNavigate } from "react-router-dom"

export default function ShareholderList(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Shareholder
        </small>

        <h6 className="mt-2">Shareholder List</h6>

        {/* ================= HEADER ACTIONS ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div className="d-flex gap-2 flex-wrap">

            <button
              onClick={()=>navigate("/masters/shareholder/company-wise")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              Company wise shareholder’s list
            </button>

            <button
              onClick={()=>navigate("/masters/shareholder/add")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"#fff"}}
            >
              + Add Shareholder
            </button>

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

        </div>

        {/* ================= TABLE ================= */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Shareholder Name</th>
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
        <div className="d-flex justify-content-between align-items-center mt-2">

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