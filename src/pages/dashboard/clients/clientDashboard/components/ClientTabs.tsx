import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom"

export default function ClientTabs(){

  const { clientId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

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

  /* ⭐⭐⭐ FIXED ACTIVE TAB DETECTION ⭐⭐⭐ */
  const segments = location.pathname.split("/")
  const activeMainTab = segments[3]   // <-- THIS IS THE FIX

  return (
    <>
      {/* ⭐ MOBILE SELECT */}
      <div className="d-md-none mb-2">
        <select
          className="form-select"
          value={activeMainTab}
          onChange={(e)=>navigate(`/clients/${clientId}/${e.target.value}`)}
        >
          {tabs.filter(t=>!t.static).map(tab=>(
            <option key={tab.path} value={tab.path}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* ⭐ DESKTOP TABS */}
      <div className="client-tabs d-none d-md-flex">

        {tabs.map((tab)=>{

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
    </>
  )
}
