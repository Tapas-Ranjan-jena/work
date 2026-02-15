import InfoTable from "./components/InfoTable"

export default function MCATransaction(){

  const columns = [
    {label:"Form Name", key:"form"},
    {label:"SRN", key:"srn"},
    {label:"Transaction Date", key:"date"},
    {label:"Status", key:"status"},
  ]

  const data:any[] = []

  return <InfoTable columns={columns} data={data}/>
}
