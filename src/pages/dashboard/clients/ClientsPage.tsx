import { useState } from "react"
import ClientTable from "./ClientsTable"
import PrimaryContact from "./PrimaryContacts"
import AddClientModal from "../../../components/modals/AddClientModal"
import AddCompanyModal from "../../../components/modals/AddCompanyModal"

export default function ClientPage() {

  const [tab,setTab] = useState<"clients"|"contacts">("clients")

  const [showClient,setShowClient] = useState(false)
  const [showCompany,setShowCompany] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold">Clients</h5>

        <div className="d-flex gap-2">
          {/* ⭐ ADD CLIENT */}
          <button
            className="btn btn-primary"
            onClick={()=>setShowClient(true)}
          >
            Add Client
          </button>

          {/* ⭐ ADD COMPANY */}
          <button
            className="btn btn-outline-primary"
            onClick={()=>setShowCompany(true)}
          >
            Add Company
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs mb-3">
        <button
          className={tab==="clients"?"fw-bold":""}
          onClick={()=>setTab("clients")}
        >
          Clients
        </button>

        <button
          className={tab==="contacts"?"fw-bold":""}
          onClick={()=>setTab("contacts")}
        >
          Primary Contacts
        </button>
      </div>

      {/* CONTENT */}
      {tab==="clients" ? <ClientTable/> : <PrimaryContact/>}

      {/* ⭐ MODALS */}
      {showClient && (
        <AddClientModal onClose={()=>setShowClient(false)} />
      )}

      {showCompany && (
        <AddCompanyModal onClose={()=>setShowCompany(false)} />
      )}

    </div>
  )
}
