import { useState, useEffect } from "react"
import assignmentService from "../../../../services/assignmentService"
import type { UserLookup, CompanyLookup } from "../../../../services/assignmentTypes"

type Props = {
    filters: {
        fromDate: string
        toDate: string
        memberId: string
        clientId: string
        assignmentId: string
        search: string
    }
    setFilters: (filters: any) => void
}

export default function TimesheetFilters({ filters, setFilters }: Props) {
    const [members, setMembers] = useState<UserLookup[]>([])
    const [clients, setClients] = useState<CompanyLookup[]>([])
    const [assignments, setAssignments] = useState<{ id: number; title: string }[]>([])

    useEffect(() => {
        const fetchLookups = async () => {
            try {
                const [memRes, clientRes, assignRes] = await Promise.all([
                    assignmentService.lookupUsers('maker'),
                    assignmentService.lookupCompanies(),
                    assignmentService.lookupAssignments()
                ])
                if (memRes.success) setMembers(memRes.data)
                if (clientRes.success) setClients(clientRes.data)
                if (assignRes.success) setAssignments(assignRes.data)
            } catch (err) {
                console.error("Failed to fetch filters data", err)
            }
        }
        fetchLookups()
    }, [])

    return (
        <div className="d-flex align-items-center flex-wrap gap-2">

            {/* Rows per page */}
            <select className="form-select form-select-sm" style={{ width: 72 }}>
                <option>100</option>
                <option>50</option>
                <option>25</option>
            </select>

            {/* Client filter */}
            <select 
                className="form-select form-select-sm" 
                style={{ width: 140 }}
                value={filters.clientId}
                onChange={(e) => setFilters({ ...filters, clientId: e.target.value })}
            >
                <option value="">- Client -</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            {/* Assignment filter */}
            <select 
                className="form-select form-select-sm" 
                style={{ width: 150 }}
                value={filters.assignmentId}
                onChange={(e) => setFilters({ ...filters, assignmentId: e.target.value })}
            >
                <option value="">- Assignment -</option>
                {assignments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>

            {/* Member filter */}
            <select 
                className="form-select form-select-sm" 
                style={{ width: 140 }}
                value={filters.memberId}
                onChange={(e) => setFilters({ ...filters, memberId: e.target.value })}
            >
                <option value="">- Member -</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>

            {/* Date range — start */}
            <div className="d-flex align-items-center gap-1">
                <span className="small text-muted">From:</span>
                <input
                    type="date"
                    className="form-control form-control-sm"
                    value={filters.fromDate}
                    onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                    style={{ width: 135 }}
                />
            </div>

            {/* Date range — end */}
            <div className="d-flex align-items-center gap-1">
                <span className="small text-muted">To:</span>
                <input
                    type="date"
                    className="form-control form-control-sm"
                    value={filters.toDate}
                    onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                    style={{ width: 135 }}
                />
            </div>

            {/* Search */}
            <div className="input-group input-group-sm ms-auto" style={{ width: 220 }}>
                <input 
                    className="form-control" 
                    placeholder="Search task or note..." 
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <span className="input-group-text bg-white border-start-0">
                    <i className="bi bi-search text-muted"></i>
                </span>
            </div>

        </div>
    )
}
