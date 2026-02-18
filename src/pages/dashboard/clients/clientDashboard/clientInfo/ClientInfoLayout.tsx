import { Outlet, NavLink, useParams, useLocation, useNavigate } from "react-router-dom"

export default function ClientInfoLayout(){

  const { clientId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const subtabs = [
    {label:"Client Details", path:"details"},
    {label:"Directors/KMP Details", path:"directors"},
    {label:"Past Directors/KMP Details", path:"past-directors"},
    {label:"Shareholder Details", path:"shareholders"},
    {label:"Index Of Charges", path:"charges"},
    {label:"MCA Transaction", path:"mca-transaction"},
  ]

  // detect active tab from URL
  const active = location.pathname.split("/").pop()

  return(
    <div>

      {/* ================= MOBILE SELECT ================= */}
      <div className="d-md-none mb-2">
        <select
          className="form-select"
          value={active}
          onChange={(e)=>
            navigate(`/clients/${clientId}/info/${e.target.value}`)
          }
        >
          {subtabs.map(tab=>(
            <option key={tab.path} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* ================= DESKTOP SUBTABS ================= */}
      <div className="client-tabs d-none d-md-flex">

        {subtabs.map(tab=>(
          <NavLink
            key={tab.path}
            to={`/clients/${clientId}/info/${tab.path}`}
            className={({isActive}) =>
              `client-tab ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        ))}

      </div>

      {/* ================= SUBTAB CONTENT ================= */}
      <Outlet/>

    </div>
  )
}
