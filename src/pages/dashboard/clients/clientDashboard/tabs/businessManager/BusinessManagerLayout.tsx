import { NavLink, Outlet, useParams } from "react-router-dom"

export default function BusinessManagerLayout() {

  const { clientId } = useParams()

  return (
    <div>

      {/* SUB TABS */}
      <div className="client-tabs mb-3">

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
