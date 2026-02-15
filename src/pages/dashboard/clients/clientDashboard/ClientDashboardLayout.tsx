import { Outlet } from "react-router-dom"
import ClientHeader from "./components/ClientHeader"
import ClientStats from "./components/ClientStats"
import ClientTabs from "./components/ClientTabs"

export default function ClientDashboardLayout() {

  return (
    <div className="container-fluid">

      <ClientHeader />
      <ClientStats />
      <ClientTabs />

      <Outlet />

    </div>
  )
}
