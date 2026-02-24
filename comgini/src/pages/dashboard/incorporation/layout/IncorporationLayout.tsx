import { Outlet, useOutletContext } from "react-router-dom"
import PageTopBar from "../../../../components/common/PageTopBar"
import React from "react"

type LayoutContext = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function IncorporationLayout() {

  const { setOpen } = useOutletContext<LayoutContext>()

  return (
    <div className="container-fluid">

      <PageTopBar onMenuClick={() => setOpen(prev => !prev)} />

      <Outlet />
    </div>
  )
}