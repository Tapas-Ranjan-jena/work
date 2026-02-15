import { NavLink, Outlet, useParams } from "react-router-dom"

export default function ClientInfoLayout(){

  const { clientId } = useParams()

  const tabs = [
    {label:"Client Details", path:"details"},
    {label:"Directors/KMP Details", path:"directors"},
    {label:"Past Directors/KMP Details", path:"past-directors"},
    {label:"Shareholder Details", path:"shareholders"},
    {label:"Index of Charges", path:"charges"},
    {label:"MCA Transaction", path:"mca-transaction"},
  ]

  return (
    <div>

      {/* SECOND LEVEL TABS */}
      <div className="client-tabs mb-3">

        {tabs.map(tab=>(
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

      <Outlet/>

    </div>
  )
}
