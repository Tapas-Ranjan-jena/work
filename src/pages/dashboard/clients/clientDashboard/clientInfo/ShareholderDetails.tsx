import InfoTable from "./components/InfoTable"

export default function ShareholderDetails(){

  const columns = [
    {label:"Shareholder Name", key:"name"},
    {label:"Father Name", key:"father"},
    {label:"Type of share", key:"type"},
    {label:"Number of Share", key:"shares"},
  ]

  // ⭐ future API data will replace this
  const data = [
    {
      name:"GULSHAN KUMAR MAGON",
      father:"GOPAL KRISHAN MAGON",
      type:"(With Voting Rights) (Equity)",
      shares:"400000"
    },
    {
      name:"JAGDISH CHANDER MAGON",
      father:"GOPAL KRISHAN MAGON",
      type:"(With Voting Rights) (Equity)",
      shares:"100000"
    }
  ]

  return <InfoTable columns={columns} data={data}/>
}
