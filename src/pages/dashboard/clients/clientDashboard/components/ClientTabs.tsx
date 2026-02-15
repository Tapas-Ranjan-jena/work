import { NavLink, useParams } from "react-router-dom"

export default function ClientTabs(){

  const { clientId } = useParams()

  const tabs = [
    { label:"Compliance Manager", path:"compliance" },
    { label:"Client Info", path:"info" },
    { label:"Client portal", path:"portal" },
    { label:"Primary Contact", path:"primary-contact" },
    { label:"Assignments", path:"assignments" },
    { label:"Invoice", path:"invoice" },
    { label:"Payments", path:"payments" },
    { label:"Notes", path:"notes" },
    { label:"Files", path:"files" },
    { label:"Events", path:"events" },
    { label:"Business Manager", path:"business-manager" },
    { label:"Expiry Manager", path:"expiry-manager" },
    { label:"Expenses", path:"expenses" },
  ]

  return (
    <div className="client-tabs">

      {tabs.map((tab)=>(
        <NavLink
          key={tab.path}
          to={`/clients/${clientId}/${tab.path}`}
          className={({isActive}) =>
            `client-tab ${isActive ? "active" : ""}`
          }
        >
          {tab.label}
        </NavLink>
      ))}

    </div>
  )
}
