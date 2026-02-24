import { useNavigate } from "react-router-dom"

export default function CompanyWiseRTA(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / Registrar and Transfer agents / Company Wise RTA List
        </small>

        <div className="d-flex justify-content-end mb-1">
          <button
            onClick={()=>navigate("/masters/rta-master")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>
        </div>

        <h6 className="mb-2">Company Wise RTA List</h6>

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
            <input className="form-control form-control-sm"
              placeholder="Search"
              style={{width:"180px",paddingLeft:"28px"}}
            />
          </div>

        </div>

        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>RTA Name</th>
                <th>RTA Address</th>
                <th>Contact Person Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Type of Share</th>
                <th>ISIN</th>
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