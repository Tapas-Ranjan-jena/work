export default function ClientStats(){

  const stats = [
    { title:"Tasks", color:"#4c9bc3"},
    { title:"Invoice Value", color:"#3c439b"},
    { title:"Payments", color:"#3bb58f"},
    { title:"Due", color:"#ff5757"}
  ]

  return (
    <div className="row g-3 mb-3">

      {stats.map((item,index)=>(
        <div key={index} className="col-lg-3">

          <div
            className="client-stats"
            style={{background:item.color}}
          >
            {item.title}
          </div>

        </div>
      ))}

    </div>
  )
}
