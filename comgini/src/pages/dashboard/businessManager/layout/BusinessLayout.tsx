import { Outlet } from "react-router-dom"


export default function BusinessLayout() {
  return (
    <div className="container-fluid p-3">

      

      <div className="card border-0 shadow-sm mt-3">
        <div className="card-body">
          <Outlet />
        </div>
      </div>

    </div>
  )
}