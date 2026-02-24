import { useNavigate } from "react-router-dom"

export default function RTAMasterList(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Registrar and Transfer agents
        </small>

        {/* ACTION BUTTON ROW */}
        <div className="d-flex justify-content-end gap-2 mb-1">
          <button
            onClick={()=>navigate("/masters/rta-master/company-wise")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            Company wise RTA List
          </button>

          <button
            onClick={()=>navigate("/masters/rta-master/add")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            + Add RTA
          </button>
        </div>

        <h6 className="mb-2">Particulars of RTAs</h6>

        {/* CONTROLS */}
        <div className="d-flex justify-content-between flex-wrap gap-2 mb-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div style={{position:"relative"}}>
            <i className="bi bi-search"
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

        {/* TABLE */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name of RTAs</th>
                <th>CIN</th>
                <th>Address</th>
                <th>Contact Person Name</th>
                <th>Email</th>
                <th>Contact no.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
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