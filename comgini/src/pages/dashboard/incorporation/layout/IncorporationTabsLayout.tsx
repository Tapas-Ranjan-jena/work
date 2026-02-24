import { Outlet } from "react-router-dom"

type Props = {
  title: string
}

export default function IncorporationTabsLayout({}: Props) {
  return (
    <>
      <Outlet />
    </>
  )
}