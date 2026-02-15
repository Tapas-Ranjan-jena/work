import InfoTable from "./components/InfoTable"

export default function IndexOfCharges(){

  const columns = [
    {label:"Charge ID", key:"id"},
    {label:"Charge Holder", key:"holder"},
    {label:"Creation Date", key:"date"},
    {label:"Amount", key:"amount"},
    {label:"Status", key:"status"},
  ]

  const data:any[] = []

  return <InfoTable columns={columns} data={data}/>
}
