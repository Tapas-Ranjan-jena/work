import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import mastersService from "../../../../services/mastersService"
import type { Company, MISReport, PrimaryContact } from "../../../../types/masters.types"

type Props = {
    type: "company" | "llp"
}

export default function MISReportForm({ type }: Props) {
    const [companies, setCompanies] = useState<Company[]>([])
    const [selectedCompanyId, setSelectedCompanyId] = useState<number>(0)
    const [dateAsOn, setDateAsOn] = useState<string>("")
    const [generating, setGenerating] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    
    // History State
    const [history, setHistory] = useState<MISReport[]>([])
    const [historyPage, setHistoryPage] = useState(1)
    const [totalHistory, setTotalHistory] = useState(0)
    const [loadingHistory, setLoadingHistory] = useState(false)

    // Primary Contacts State
    const [contacts, setContacts] = useState<PrimaryContact[]>([])
    const [selectedContact, setSelectedContact] = useState<string>("")

    useEffect(() => {
        // Reset selections when switching tabs
        setSelectedCompanyId(0)
        setDateAsOn("")
        setSearchQuery("")
        setHistory([])
        setHistoryPage(1)
        setTotalHistory(0)
        fetchDropdownCompanies()
        fetchPrimaryContacts()
    }, [type])

    useEffect(() => {
        fetchHistory()
    }, [selectedCompanyId, historyPage])

    const fetchPrimaryContacts = async () => {
        try {
            const res = await mastersService.getPrimaryContacts()
            setContacts(res)
        } catch (error) {
            console.error("Failed to fetch primary contacts:", error)
        }
    }

    const fetchHistory = async () => {
        setLoadingHistory(true)
        try {
            const res = await mastersService.getMISReportHistory(selectedCompanyId, historyPage, 10)
            setHistory(res.data)
            setTotalHistory(res.pagination.total)
        } catch (error) {
            console.error("Failed to fetch history:", error)
            toast.error("Failed to load history")
        } finally {
            setLoadingHistory(false)
        }
    }

    const fetchDropdownCompanies = async (search?: string) => {
        try {
            if (search) {
                const res = await mastersService.searchMCACompanies(search)
                setCompanies(res)
            } else {
                const res = await mastersService.getCompanies(1, 100)
                // Filter companies based on type if needed, or simply populate all
                setCompanies(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch companies:", error)
        }
    }

    const handleSearchMCA = () => {
        if (!searchQuery) {
            fetchDropdownCompanies()
            return
        }
        fetchDropdownCompanies(searchQuery)
    }

    const handleGenerate = async () => {
        if (!selectedCompanyId) return toast.error("Please select a company/LLP")
        if (!dateAsOn) return toast.error("Please select date as on")

        setGenerating(true)
        try {
            await mastersService.generateMISReport({
                company_id: selectedCompanyId,
                date: dateAsOn,
                type: type
            })
            toast.success("MIS Report generated successfully")
            // Refresh history after generation
            setHistoryPage(1)
            fetchHistory()
        } catch (error: any) {
            toast.error(error.message || "Failed to generate report")
        } finally {
            setGenerating(false)
        }
    }

    const softBtn = {
        background: "#f3f4f6",
        border: "1px solid #e5e7eb",
        color: "#374151"
    }

    return (
        <div>
            {/* ===== FILTER SECTION ===== */}
            <div className="row g-3 mb-3">
                <div className="col-md-3">
                    <label className="small">Search MCA</label>
                    <div className="d-flex gap-2">
                        <input 
                            className="form-control form-control-sm" 
                            placeholder="Search ABC..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-sm btn-light border" onClick={handleSearchMCA}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="col-md-3">
                    <label className="small">Select {type === "company" ? "Company" : "LLP"}</label>
                    <select 
                        className="form-select form-select-sm"
                        value={selectedCompanyId}
                        onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
                    >
                        <option value={0}>Select</option>
                        {companies.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <label className="small">Date As On</label>
                    <input 
                        type="date"
                        className="form-control form-control-sm" 
                        value={dateAsOn}
                        onChange={(e) => setDateAsOn(e.target.value)}
                    />
                </div>

                <div className="col-md-2">
                    <label className="small">Select Data</label>
                    <select 
                        className="form-select form-select-sm"
                        value={selectedContact}
                        onChange={(e) => setSelectedContact(e.target.value)}
                    >
                        <option value="">Select</option>
                        {contacts.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({c.company_name})</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                    <button 
                        className="btn btn-sm w-100" 
                        style={{ background: "#2E388E", color: "#fff" }}
                        onClick={handleGenerate}
                        disabled={generating}
                    >
                        {generating ? "Generating..." : "Generate"}
                    </button>
                </div>

            </div>

            {/* ===== HISTORY TITLE ===== */}
            <h6 className="mb-2">MIS Report History {type === "company" ? "Company" : "LLP"}</h6>

            {/* ===== CONTROLS ===== */}
            <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
                <button className="btn btn-sm" style={softBtn}>
                    Show 10 entries
                </button>

                <div style={{ position: "relative" }}>
                    <i className="bi bi-search"
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "13px",
                            color: "#888"
                        }}
                    />
                    <input
                        className="form-control form-control-sm"
                        placeholder="Search"
                        style={{ width: "180px", paddingLeft: "28px" }}
                    />
                </div>
            </div>

            {/* ===== TABLE ===== */}
            <div style={{ overflowX: "auto" }}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Generated On</th>
                            <th>Generated By</th>
                            <th>Generated For</th>
                            <th>MIS Date as on</th>
                            <th>Origin</th>
                            <th>Export</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingHistory ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-muted">Loading history...</td>
                            </tr>
                        ) : history.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-muted">
                                    No data available in table
                                </td>
                            </tr>
                        ) : (
                            history.map((h, index) => (
                                <tr key={h.id}>
                                    <td>{(historyPage - 1) * 10 + index + 1}</td>
                                    <td>{new Date(h.generated_on).toLocaleDateString()}</td>
                                    <td>{h.generated_by}</td>
                                    <td>{h.generated_for}</td>
                                    <td>{new Date(h.mis_date).toLocaleDateString()}</td>
                                    <td>{h.origin}</td>
                                    <td>
                                        {h.export_link && (
                                            <a href={h.export_link} target="_blank" rel="noreferrer" className="btn btn-sm btn-light border">
                                                <i className="bi bi-download"></i>
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-light border-0">...</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ===== FOOTER ===== */}
            <div
                className="d-flex justify-content-between align-items-center mt-2 pt-2"
                style={{ borderTop: "1px solid #e5e7eb" }}
            >
                <small className="text-muted">
                    {totalHistory > 0 ? `Showing ${(historyPage - 1) * 10 + 1} to ${Math.min(historyPage * 10, totalHistory)} of ${totalHistory} entries` : "Showing 0 to 0 of 0 entries"}
                </small>

                <div className="d-flex gap-2">
                    <button 
                        className="btn btn-sm" 
                        style={softBtn}
                        onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
                        disabled={historyPage === 1 || loadingHistory}
                    >
                        Previous
                    </button>
                    <button 
                        className="btn btn-sm" 
                        style={softBtn}
                        onClick={() => setHistoryPage(p => Math.min(Math.ceil(totalHistory / 10), p + 1))}
                        disabled={historyPage >= Math.ceil(totalHistory / 10) || loadingHistory}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>
    )
}
