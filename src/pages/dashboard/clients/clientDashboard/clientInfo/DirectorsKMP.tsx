import InfoTable from "./components/InfoTable"

export default function DirectorsKMP(){

  const columns = [
    {label:"DIN", key:"din"},
    {label:"Name", key:"name"},
    {label:"Appointment Date", key:"date"},
    {label:"Designation", key:"designation"},
    {label:"DSC Status", key:"status"},
  ]

  const data:any[] = []

  return <InfoTable columns={columns} data={data}/>
}
