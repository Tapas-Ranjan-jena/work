import { NavLink, useParams } from "react-router-dom"

export default function ClientTabs(){

  const { clientId } = useParams()

  const tabs = [
    { label:"Compliance Manager", path:"compliance", static:true },
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

      {tabs.map((tab)=>{

        /* ⭐ Compliance Manager → NOT A LINK */
        if(tab.static){
  return(
    <div
      key={tab.path}
      style={{
        background:"linear-gradient(90deg,#3346a8 0%,#2f64c6 45%,#2fa0dc 100%)",
        color:"#fff",
        fontSize:"12px",
        padding:"6px 10px",
        borderRadius:"4px",
        fontWeight:500,
        flexShrink:0,
        display:"flex",
        alignItems:"center"
      }}
    >
      {tab.label}
    </div>
  )
}


        /* ⭐ NORMAL TABS */
        return(
          <NavLink
            key={tab.path}
            to={`/clients/${clientId}/${tab.path}`}
            className={({isActive}) =>
              `client-tab ${isActive ? "active" : ""}`
            }
          >
            {tab.label}
          </NavLink>
        )
      })}

    </div>
  )
}
