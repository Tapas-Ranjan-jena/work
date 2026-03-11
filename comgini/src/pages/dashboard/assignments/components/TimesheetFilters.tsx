export default function TimesheetFilters() {
    return (
        <div className="d-flex align-items-center flex-wrap gap-2">

            {/* Rows per page */}
            <select className="form-select form-select-sm" style={{ width: 72 }}>
                <option>100</option>
                <option>50</option>
                <option>25</option>
            </select>

            {/* Column toggle icon */}
            <button className="btn btn-light btn-sm border" title="Column settings">
                <i className="bi bi-layout-three-columns"></i>
            </button>

            {/* Client filter */}
            <select className="form-select form-select-sm" style={{ width: 120 }}>
                <option>- Client -</option>
            </select>

            {/* Assignment filter */}
            <select className="form-select form-select-sm" style={{ width: 135 }}>
                <option>- Assignment -</option>
            </select>

            {/* Member filter */}
            <select className="form-select form-select-sm" style={{ width: 120 }}>
                <option>- Member -</option>
            </select>

            {/* Date range — start */}
            <input
                type="text"
                className="form-control form-control-sm"
                defaultValue="8th February 2026"
                style={{ width: 140 }}
            />

            {/* Date range — end */}
            <input
                type="text"
                className="form-control form-control-sm"
                defaultValue="23rd February 2026"
                style={{ width: 140 }}
            />

            {/* Export */}
            <button className="btn btn-light btn-sm border">Excel</button>
            <button className="btn btn-light btn-sm border">Print</button>

            {/* Search */}
            <div className="input-group input-group-sm" style={{ width: 180 }}>
                <input className="form-control" placeholder="Search" />
                <span className="input-group-text bg-white">
                    <i className="bi bi-search"></i>
                </span>
            </div>

        </div>
    )
}
