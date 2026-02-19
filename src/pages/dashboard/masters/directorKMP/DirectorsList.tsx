import { useNavigate } from "react-router-dom"

export default function DirectorsList() {

  const navigate = useNavigate()

  return (
    <div className="container-fluid">

      <div className="card p-3">

        <small className="text-muted">
          Home / Director & KMP
        </small>

        <div className="d-flex justify-content-between align-items-center mt-2 mb-3 flex-wrap gap-2">

          <h6 className="m-0">Directors Details</h6>

          <div className="d-flex gap-2 flex-wrap">

            <button
              onClick={()=>navigate("/masters/director-kmp/dir8-mbp1")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              DIR-8 / MBP-1
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/inactive")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              Inactive Director List
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/company-wise")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              Company wise directors List
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/add-director")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              + Add Director
            </button>

            <button
              onClick={()=>navigate("/masters/director-kmp/add-kmp")}
              className="btn btn-sm"
              style={{background:"#2E388E",color:"white"}}
            >
              + Add KMP
            </button>

          </div>

        </div>

        <div className="d-flex justify-content-between mb-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Show 10 rows</button>
            <button className="btn btn-light btn-sm">Excel</button>
          </div>

          <div style={{ position:"relative" }}>
            <i
              className="bi bi-search"
              style={{
                position:"absolute",
                left:"10px",
                top:"50%",
                transform:"translateY(-50%)",
                fontSize:"13px",
                color:"#888",
                pointerEvents:"none"
              }}
            />
            <input
              className="form-control form-control-sm"
              placeholder="Search"
              style={{
                width:"180px",
                paddingLeft:"28px"
              }}
            />
          </div>

        </div>

        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>DIN</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>DSC Expiry</th>
                <th>DIN Status</th>
                <th>DIR-3 KYC Status</th>
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

      </div>

    </div>
  )
}
