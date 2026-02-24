import { useNavigate } from "react-router-dom"

export default function CompanyWiseStatutory(){

  const navigate = useNavigate()

  return(
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="m-0">Company wise Auditor's List</h6>

        <button
          onClick={()=>navigate(-1)}
          className="btn btn-sm"
          style={{background:"#2E388E",color:"#fff"}}
        >
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>
      </div>

      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm">Show 10 rows</button>
          <button className="btn btn-light btn-sm">Excel</button>
        </div>

        <div style={{position:"relative"}}>
          <i className="bi bi-search"
            style={{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"13px",color:"#888"}}
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
              <th>Category</th>
              <th>Auditor's Name</th>
              <th>FRN</th>
              <th>M. No / COP</th>
              <th>PAN</th>
              <th>Email</th>
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

      <div className="d-flex justify-content-between mt-2">
        <small>Showing 0 to 0 of 0 entries</small>
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm">Previous</button>
          <button className="btn btn-light btn-sm">Next</button>
        </div>
      </div>
    </>
  )
}