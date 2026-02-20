import { Outlet } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import PageTopBar from "../../../components/common/PageTopBar"

type LayoutContext = {
  setOpen: (val: boolean | ((prev:boolean)=>boolean)) => void
  open: boolean
}

export default function MasterLayout() {

  // ⭐ Get sidebar control from DashboardLayout
  const { open, setOpen } = useOutletContext<LayoutContext>()

  return (
    <div className="container-fluid">

      {/* ⭐ Reusable Top Bar */}
      <PageTopBar
        onMenuClick={() => setOpen(prev => !prev)}
      />

      {/* ⭐ Page Content */}
      <Outlet />

    </div>
  )
}
