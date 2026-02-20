import { NavLink, Outlet, useParams, useLocation, useNavigate } from "react-router-dom"

export default function BusinessManagerLayout() {

  const { clientId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const subtabs = [
    { label:"Registration/License", path:"registration" },
    { label:"Insurance", path:"insurance" },
    { label:"Contract/Agreement", path:"contract-agreement" },
  ]

  // ⭐ detect active tab from url
  const active = location.pathname.split("/").pop()

  return (
    <div>

      {/* ⭐ MOBILE SELECT (NEW — does NOT affect desktop design) */}
      <div className="d-md-none mb-2">
        <select
          className="form-select"
          value={active}
          onChange={(e)=>
            navigate(`/clients/${clientId}/business-manager/${e.target.value}`)
          }
        >
          {subtabs.map(tab=>(
            <option key={tab.path} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* ⭐ DESKTOP TABS (UNCHANGED DESIGN) */}
      <div className="client-tabs mb-3 d-none d-md-flex">

        <NavLink
          to={`/clients/${clientId}/business-manager/registration`}
          className={({isActive}) =>
            `client-tab ${isActive ? "active" : ""}`
          }
        >
          Registration/License
        </NavLink>

        <NavLink
          to={`/clients/${clientId}/business-manager/insurance`}
          className={({isActive}) =>
            `client-tab ${isActive ? "active" : ""}`
          }
        >
          Insurance
        </NavLink>

        <NavLink
          to={`/clients/${clientId}/business-manager/contract-agreement`}
          className={({isActive}) =>
            `client-tab ${isActive ? "active" : ""}`
          }
        >
          Contract/Agreement
        </NavLink>

      </div>

      {/* CHILD ROUTES */}
      <Outlet />

    </div>
  )
}
