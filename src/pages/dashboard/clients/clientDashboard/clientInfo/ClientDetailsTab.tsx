export default function ClientDetailsTab(){

  // ⭐ later replace with API response
  const details = [
    { label:"CIN", value:"U26932RJ1996PLC01246" },
    { label:"Company Name", value:"All Infratech Limited" },

    { label:"Authorized Capital", value:"5000000" },
    { label:"Email", value:"ari@arinfratech.com" },

    { label:"Paid up Capital", value:"5000000" },
    { label:"Whether Listed", value:"Unlisted" },

    { label:"PAN", value:"AAFCA9416Q" },
    { label:"TAN", value:"-" },

    { label:"class of Company", value:"Public" },
    { label:"Status", value:"Active" },

    { label:"Registration Number", value:"012146" },
    { label:"RoC", value:"ROC Jaipur" },

    { label:"Category", value:"Company limited by shares" },
    { label:"Sub Category", value:"Non-government company" },

    { label:"Address", value:"-" },
    { label:"Address where books of accounts are maintained", value:"-" },

    { label:"Date of Last Balance Sheet", value:"-" },
    { label:"Date of Last AGM", value:"-" },

    { label:"Date of Incorporation", value:"01/01/1970" },
    { label:"Company Contact No", value:"-" },
  ]

  return (
    <div className="client-details-grid">

      {details.map((item,index)=>(
        <div key={index} className="details-row">

          <div className="details-label">
            {item.label}
          </div>

          <div className="details-value">
            {item.value}
          </div>

        </div>
      ))}

    </div>
  )
}
