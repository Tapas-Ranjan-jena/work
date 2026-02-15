import InfoTable from "./components/InfoTable"

export default function PastDirectorsKMP(){

  const columns = [
    {label:"DIN", key:"din"},
    {label:"Name", key:"name"},
    {label:"Cessation Date", key:"date"},
    {label:"Designation", key:"designation"},
  ]

  const data:any[] = []

  return <InfoTable columns={columns} data={data}/>
}
