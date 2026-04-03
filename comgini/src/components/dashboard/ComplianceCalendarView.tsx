import React, { useState } from "react";

const ComplianceCalendarView: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Private Company");
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        "Quarterly Compliance": false,
        "Half Yearly Compliance": false,
        "Annual Compliance": false,
        "Event Based Compliance": false,
        "Corporate Actions": false,
        "SAST 30": false,
        "SAST 29": false
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const categories = [
        "Private Company",
        "Public / Deemed Public Companies",
        "LLPs",
        "Listed Companies"
    ];

    // Data for Private & Public Tables
    const privateCompanyData = [
        { sr: 1, form: "Disclosure u/s 184 and 164", desc: "MBP-1 and DIR-8", due: "At the beginning of financial year" },
        { sr: 2, form: "Form MSME-1 (October, 2024-March, 2025)", desc: "Half-yearly return with the registrar for outstanding payments to Micro or Small Enterprises.", due: "30/04/2025" },
        { sr: 3, form: "DPT-3 (Annual Return of Deposit And Exempted Deposit)", desc: "Except for the Government companies, all other companies which include all private limited companies, OPC, limited companies or Section 8 Company have to mandatorily file this form, if they have accepted deposit or Amount which are exempted as Deposit.", due: "30/06/2025" },
        { sr: 4, form: "Form CRA-2", desc: "Appointment of Cost Auditor (if applicable)", due: "30/09/2025" },
        { sr: 5, form: "DIR-3 KYC (KYC of DIN holders)", desc: "Every person who has a valid DIN", due: "30/09/2025" },
        { sr: 6, form: "MGT-14", desc: "Appointment of Secretarial Auditor/Internal Auditor (if applicable)", due: "30/09/2025" },
        { sr: 7, form: "Demat for Private Companies", desc: "Apply for ISIN", due: "30/06/2025" },
        { sr: 8, form: "Form DIR-12", desc: "For Appointment of Director/Regularization of Additional Director at Annual General Meeting", due: "Within 30 days from date of AGM" },
        { sr: 9, form: "ADT-1", desc: "Auditors Appointment/Re-appointment, if any", due: "Within 15 days of appointment" },
        { sr: 10, form: "Form AOC-4, AOC-4 CFS ; Form AOC-4XBRL (Filing of annual accounts)", desc: "Every company should file financial statements with the ROC. (Within 30 days of the date of AGM)", due: "29/10/2025" },
        { sr: 11, form: "Form MSME-1 (April, 2025 - Sep, 2025)", desc: "Half-yearly return with the registrar for outstanding payments to Micro or Small Enterprises.", due: "31/10/2025" },
        { sr: 12, form: "MGT-7/7A (Filing of annual returns)", desc: "Every company should file an annual return, furnishing details about the company with the ROC. (Within 60 days of the date of AGM)", due: "29/11/2025" },
        { sr: 13, form: "BEN-2", desc: "Section 90", due: "Within 30 days from the receipt of Declaration in Form BEN-1" },
        { sr: 14, form: "MGT-6", desc: "Section 89", due: "Within 30 days from the date of receipt of declaration in MGT-4 & 5" },
        { sr: 15, form: "CRA-4 (Filing of Cost Audit Report)", desc: "Companies mentioned under Section. 148 of Companies Act, 2013 shall file this Return with Registrar.", due: "30 days from the receipt of Cost Audit Report" },
        { sr: 16, form: "Form DIR-12", desc: "For Appointment of Director", due: "Within 30 days from date of Appointment" }
    ];

    const publicCompanyData = [
        { sr: 1, form: "Disclosure u/s 184 and 164", desc: "MBP-1 and DIR-8", due: "At the beginning of financial year" },
        { sr: 2, form: "Form MSME-1 (October, 2024-March, 2025)", desc: "Half-yearly return with the registrar for outstanding payments to Micro or Small Enterprises.", due: "30/04/2025" },
        { sr: 3, form: "PAS-6 (October, 2024-March, 2025)", desc: "To be filed by Unlisted Public Co. for reconciliation of share capital audit report (HY)", due: "30/05/2025" },
        { sr: 4, form: "MGT-14", desc: "Board Resolution for draft Financials & Director Report for public companies", due: "within 30 days from BM" },
        { sr: 5, form: "DPT-3 (Annual Return of Deposit And Exempted Deposit)", desc: "Except for the Government companies, all other companies which include all private limited companies, OPC, limited companies or Section 8 Company have to mandatorily file this form, if they have accepted deposit or Amount which are exempted as Deposit.", due: "30/06/2025" },
        { sr: 6, form: "Form CRA-2", desc: "Appointment of Cost Auditor (if applicable)", due: "30/09/2025" },
        { sr: 7, form: "DIR-3 KYC (KYC of DIN holders)", desc: "Every person who has a valid DIN", due: "30/09/2025" },
        { sr: 8, form: "MGT-14", desc: "Appointment of Secretarial Auditor/Internal Auditor (if applicable)", due: "30/09/2025" },
        { sr: 9, form: "Demat for Private Companies", desc: "Apply for ISIN", due: "30/06/2025" },
        { sr: 10, form: "Form DIR-12", desc: "For Appointment of Director/Regularization of Additional Director at Annual General Meeting", due: "Within 30 days from date of AGM" },
        { sr: 11, form: "ADT-1", desc: "Auditors Appointment/Re-appointment, if any", due: "Within 15 days of appointment" },
        { sr: 12, form: "MGT-14", desc: "Board Resolution for audited Financials & Director Report for public companies", due: "within 30 days from BM" },
        { sr: 13, form: "Form AOC-4, AOC-4 CFS ; Form AOC-4XBRL (Filing of annual accounts)", desc: "Every company should file financial statements with the ROC. (Within 30 days of the date of AGM)", due: "29/10/2025" },
        { sr: 14, form: "Form MSME-1 (April, 2025 - Sep, 2025)", desc: "Half-yearly return with the registrar for outstanding payments to Micro or Small Enterprises.", due: "31/10/2025" },
        { sr: 15, form: "PAS-6 (April, 2025 - Sep, 2025)", desc: "To be filed by Unlisted Public Co. for reconciliation of share capital audit report (HY)", due: "29/11/2025" },
        { sr: 16, form: "MGT-7 (Filing of annual returns)", desc: "Every company should file an annual return, furnishing details about the company with the ROC. (Within 60 days of the date of AGM)", due: "29/11/2025" },
        { sr: 17, form: "BEN-2", desc: "Section 90", due: "Within 30 days from the receipt of Declaration in Form BEN-1" },
        { sr: 18, form: "MGT-6", desc: "Section 89", due: "Within 30 days from the date of receipt of declaration in MGT-4 & 5" },
        { sr: 19, form: "CRA-4 (Filing of Cost Audit Report)", desc: "Companies mentioned under Section. 148 of Companies Act, 2013 shall file this Return with Registrar.", due: "30 days from receipt of Cost Audit Report" },
        { sr: 20, form: "Form MR-1", desc: "Appointment/Re-appointment of MD, WTD", due: "Within 60 days from the date of appointment" },
        { sr: 21, form: "Form DIR-12", desc: "For Appointment of Director", due: "Within 30 days from date of Appointment" }
    ];

    const llpData = [
        { sr: 1, form: "Form 11 (Annual returns of an LLP)", desc: "Annual statement for submitting details of the business of the LLP and its partners.", due: "30/05/2025" },
        { sr: 2, form: "DIR-3 KYC (KYC of DIN holders)", desc: "Every person who has a valid DIN", due: "30/09/2025" },
        { sr: 3, form: "Form 8 (Financial Reports of an LLP)", desc: "Every LLP should submit the data of its P & L and balance sheet, whether Audited or not.", due: "30/10/2025" }
    ];

    const quarterlyData = [
        { ref: "Regulation 13 (3) - Statement of Grievance Redressal Mechanism", timeline: "Within 21 days from the end of the quarter.", june: "By 21- July", sept: "By 21- October", dec: "By 21- January", march: "By 21- April" },
        { ref: "27(2)(a) - Corporate Governance Report", timeline: "Within 21 days from the end of the quarter.", june: "By 21- July", sept: "By 21- October", dec: "By 21- January", march: "By 21- April", hasLink: true },
        { ref: "Regulation 31 (1) (b)- Shareholding Pattern", timeline: "Within 21 days from the end of the quarter.", june: "By 21- July", sept: "By 21- October", dec: "By 21- January", march: "By 21- April", hasLink: true },
        { ref: "Regulation 32 (1) - Statement of deviation(s) or variation(s).", timeline: "Within 45 days from the end of the quarter/Within 60 days from the end of the last quarter", june: "By 14- August", sept: "By 14- November", dec: "By 14- February", march: "By 30 May" },
        { ref: "Regulation 33 (3) (a) - Financial Results alongwith Limited review report/Auditor's report", timeline: "Within 45 days from the end of the quarter/Within 60 days from the end of the last quarter", june: "By 14- August", sept: "By 14- November", dec: "By 14- February", march: "By 30 May" },
        { ref: "Reconciliation of share capital audit report", timeline: "Within 30 days from the end of the quarter.", june: "By 30- July", sept: "By 30- October", dec: "By 30- January", march: "By 30- April" }
    ];

    const halfYearlyData = [
        { ref: "Regulation 23 (9) - Disclosures of related party transactions", timeline: "On the date of publication of standalone and consolidated financial results" }
    ];

    const annualData = [
        { ref: "Regulation 7 (3) - Share Transfer Agent", timeline: "Within 30 days from the end of the financial year" },
        { ref: "Regulation 34(2)(f) - Business Responsibility and Sustainability Report (applicable to top 1000 listed entities)", timeline: "Along with Annual Report" },
        { ref: "Regulation 24A - Secretarial Compliance Report", timeline: "within 60 days of the end of the financial year", hasLink: true },
        { ref: "Regulation 33 (3) (d) - Financial Results along with Auditor's Report", timeline: "Within 60 days from the end of the financial year" },
        { ref: "Regulation 34(1) - Annual Report", timeline: "Not later than the day of commencement of dispatch to its shareholders." },
        { ref: "Regulation 40 (10) - Transfer or transmission or transposition of securities", timeline: "Within 30 days from the end of the financial year" },
        { ref: "Initial Disclosure requirements for large entities", timeline: "Within 30 days from the beginning of the FY" },
        { ref: "Annual Disclosure requirements for large entities", timeline: "Within 45 days of the end of the FY" }
    ];

    const eventData = [
        { ref: "Regulation 7(5) – Intimation of appointment of Share Transfer Agent", when: "Within 7 days of Agreement with RTA" },
        { ref: "Regulation 28 (1) - In-principle approval of recognized stock exchange(s)", when: "Before issuing securities" },
        { ref: "Regulation 29 (2) (b) to (f) - Prior intimation of Board meeting for Buyback, Dividend, Raising of Funds, Voluntary Delisting, Bonus, etc.,", when: "Atleast two working days in advance, excluding the date of the intimation and date of the meeting" },
        { ref: "Regulation 29 (2) (a) - Prior intimation of Board meeting for Financial Results", when: "Atleast five days in advance (excluding the date of the intimation and date of the meeting)" },
        { ref: "Regulation 29(3) -Prior intimation of Board Meeting for alteration in nature of securities etc.", when: "Atleast eleven working days in advance" },
        { ref: "Regulation 30 (6) – Disclosure of events or information", when: "Disclose to stock exchange(s) of all events, as specified in Part A of Schedule III, or information as soon as reasonably possible and not later than twenty four hours from the occurrence of event or information" },
        { ref: "Regulation 30 (6) – Disclosure of events or information", when: "Disclosure with respect to events specified in sub-para 4 of Para A of Part A of Schedule III shall be made within thirty minutes of the conclusion of the board meeting" },
        { ref: "Regulation 31(1)(a) – Shareholding Pattern prior to listing of securities", when: "One day prior to listing of securities" },
        { ref: "Regulation 31(1)(c) – Shareholding Pattern in case of capital restructuring", when: "Within 10 days of any change in capital +/- 2%" },
        { ref: "Regulation 37(2) – Draft Scheme of arrangement", when: "Obtain observation letter or No-objection letter from the stock exchange(s) before filing the scheme with any court or tribunal" },
        { ref: "Regulation 39(3) – Loss of share certificates and issue of the duplicate certificates", when: "Within two days of getting information" },
        { ref: "Regulation 44(3) – Voting Results", when: "Within two working days of conclusion of Meeting" },
        { ref: "Regulation 45(3) – Change in name", when: "Prior approval from Stock Exchange before filing application with Registrar of Companies" },
        { ref: "Regulation 46 - Website", when: "The listed entity shall maintain a functional website containing the basic information about the listed entity" }
    ];

    const corporateData = [
        { ref: "Regulation 42 (2) - Record Date for dividend, bonus, rights etc.,", when: "The listed entity shall give notice in advance of atleast seven working days (excluding the date of intimation and the record date) to stock exchange(s) of record date specifying the purpose of the record date", mode: "NEAPS>COMPLIANCE>ANNOUNCEMENTS/BM/CA" },
        { ref: "Regulation 42 (3) - Record Date", when: "The listed entity shall recommend or declare all dividend and/or cash bonuses at least five working days (excluding the date of intimation and the record date) before the record date fixed for the purpose.", mode: "NEAPS>COMPLIANCE>ANNOUNCEMENTS/BM/CA" },
        { ref: "Regulation 42 (4) - Record Date", when: "The listed entity shall ensure the time gap of at least thirty days between two record dates", mode: "NEAPS>COMPLIANCE>ANNOUNCEMENTS/BM/CA" },
        { ref: "Regulation 42 (5) - Book Closure", when: "For securities held in physical form, the listed entity may, announce dates of closure of its transfer books in place of record date. The listed entity shall ensure that there is a time gap of atleast thirty days between two dates of closure of its transfer books.", mode: "NEAPS>COMPLIANCE>ANNOUNCEMENTS/BM/CA" }
    ];

    const currentData = activeTab === "Private Company" ? privateCompanyData : (activeTab === "Public / Deemed Public Companies" ? publicCompanyData : (activeTab === "LLPs" ? llpData : []));

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px", backgroundColor: "#fff" }}>
            {/* ⭐ BREADCRUMB */}
            <div className="d-flex justify-content-between align-items-center mb-4 text-secondary">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb small mb-0">
                        <li className="breadcrumb-item text-primary" style={{ cursor: "pointer" }}>Home</li>
                        <li className="breadcrumb-item active" aria-current="page">Compliance Calendar</li>
                    </ol>
                </nav>
                <button className="btn btn-primary btn-sm px-4 fw-bold shadow-sm" style={{ backgroundColor: "#2b4cb3", border: "none" }}>
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </button>
            </div>

            {/* ⭐ DISCLAIMER */}
            <div className="alert alert-danger border-0 small py-3 mb-4" style={{ backgroundColor: "transparent", color: "#e63946", border: "none", lineHeight: "1.6" }}>
                <span className="fw-bold">Important: Please Note, </span>
                <span>this information are based on current laws and available data. While we aim for accuracy, please verify legal provisions independently. This is not professional advice and may change. We are not responsible for any outcomes from using this information. Thank you.</span>
            </div>

            {/* ⭐ TABS & EXPORT */}
            <div className="d-flex justify-content-between align-items-end mb-4 border-bottom">
                <div className="d-flex gap-4">
                    {categories.map((cat) => (
                        <div 
                            key={cat}
                            className={`pb-2 px-1 small fw-bold text-nowrap transition-all`}
                            style={{ 
                                cursor: "pointer", 
                                color: activeTab === cat ? "#2b4cb3" : "#6c757d",
                                borderBottom: activeTab === cat ? "2px solid #2b4cb3" : "2px solid transparent",
                                marginBottom: "-1px"
                            }}
                            onClick={() => setActiveTab(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
                
                <div className="dropdown pb-2">
                    <button className="btn btn-primary btn-sm dropdown-toggle px-3 fw-bold shadow-sm" style={{ backgroundColor: "#2b4cb3", border: "none" }} type="button" data-bs-toggle="dropdown">
                        Export
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 small">
                        <li><a className="dropdown-item py-2" href="#"><i className="bi bi-file-earmark-word me-2 text-primary"></i> Word</a></li>
                        <li><a className="dropdown-item py-2" href="#"><i className="bi bi-file-earmark-excel me-2 text-success"></i> Excel</a></li>
                        <li><a className="dropdown-item py-2" href="#"><i className="bi bi-file-earmark-pdf me-2 text-danger"></i> PDF</a></li>
                    </ul>
                </div>
            </div>

            {/* ⭐ LISTED COMPANIES ACCORDION */}
            {activeTab === "Listed Companies" ? (
                <div className="mt-2">
                    <div className="text-center mb-4">
                        <h6 className="fw-bold text-dark text-uppercase small" style={{ letterSpacing: "1px" }}>LODR COMPLIANCE FOR LISTED ENTITES</h6>
                    </div>

                    {/* SECTION: QUARTERLY */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("Quarterly Compliance")}
                        >
                            <span className="fw-bold small text-dark">Quarterly Compliance</span>
                            <i className={`bi bi-${expandedSections["Quarterly Compliance"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["Quarterly Compliance"] && (
                            <div className="p-0 border-top">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 align-middle small" style={{ fontSize: "11px" }}>
                                        <thead className="text-white" style={{ backgroundColor: "#cfe2ff", color: "#333 !important" }}>
                                            <tr className="bg-primary" style={{ backgroundColor: "#0d6efd" }}>
                                                <th className="text-white fw-bold">QUARTERLY COMPLIANCE</th>
                                                <th colSpan={5} className="text-white fw-bold">WHEN TO COMPLY</th>
                                            </tr>
                                            <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                                                <th className="fw-bold">REGULATION REFERENCE</th>
                                                <th className="fw-bold">TIMELINE</th>
                                                <th className="fw-bold">FOR THE QUARTER ENDED JUNE</th>
                                                <th className="fw-bold">FOR THE QUARTER ENDED SEPTEMBER</th>
                                                <th className="fw-bold">FOR THE QUARTER ENDED DECEMBER</th>
                                                <th className="fw-bold">FOR THE QUARTER ENDED MARCH</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {quarterlyData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        {row.ref}
                                                        {row.hasLink && <br />}
                                                        {row.hasLink && <a href="#" className="text-primary text-decoration-none">Download Regulation (.zip)</a>}
                                                    </td>
                                                    <td>{row.timeline}</td>
                                                    <td className="text-center">{row.june}</td>
                                                    <td className="text-center">{row.sept}</td>
                                                    <td className="text-center">{row.dec}</td>
                                                    <td className="text-center">{row.march}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION: HALF YEARLY */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("Half Yearly Compliance")}
                        >
                            <span className="fw-bold small text-dark">Half Yearly Compliance</span>
                            <i className={`bi bi-${expandedSections["Half Yearly Compliance"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["Half Yearly Compliance"] && (
                            <div className="p-0 border-top">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 align-middle small">
                                        <thead className="bg-primary text-white">
                                            <tr style={{ backgroundColor: "#0d6efd" }}>
                                                <th colSpan={2} className="fw-bold text-uppercase" style={{ fontSize: "11px" }}>Half-Yearly Compliance</th>
                                            </tr>
                                            <tr style={{ backgroundColor: "#cfe2ff", color: "#333" }}>
                                                <th className="fw-bold">REGULATION REFERENCE</th>
                                                <th className="fw-bold">TIMELINE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {halfYearlyData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>{row.ref}</td>
                                                    <td>{row.timeline}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION: ANNUAL */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("Annual Compliance")}
                        >
                            <span className="fw-bold small text-dark">Annual Compliance</span>
                            <i className={`bi bi-${expandedSections["Annual Compliance"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["Annual Compliance"] && (
                            <div className="p-0 border-top">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 align-middle small">
                                        <thead className="bg-primary text-white">
                                            <tr style={{ backgroundColor: "#0d6efd" }}>
                                                <th colSpan={2} className="fw-bold text-uppercase" style={{ fontSize: "11px" }}>Annual Compliance</th>
                                            </tr>
                                            <tr style={{ backgroundColor: "#cfe2ff", color: "#333" }}>
                                                <th className="fw-bold">REGULATION REFERENCE</th>
                                                <th className="fw-bold">TIMELINE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {annualData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        {row.ref}
                                                        {row.hasLink && <br />}
                                                        {row.hasLink && <a href="#" className="text-primary text-decoration-none small"><i className="bi bi-file-earmark-pdf me-1"></i> Download Regulation (.pdf)</a>}
                                                    </td>
                                                    <td>{row.timeline}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION: EVENT BASED */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("Event Based Compliance")}
                        >
                            <span className="fw-bold small text-dark">Event Based Compliance</span>
                            <i className={`bi bi-${expandedSections["Event Based Compliance"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["Event Based Compliance"] && (
                            <div className="p-0 border-top">
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 align-middle small">
                                        <thead className="bg-primary text-white">
                                            <tr style={{ backgroundColor: "#0d6efd" }}>
                                                <th colSpan={2} className="fw-bold text-uppercase" style={{ fontSize: "11px" }}>Event Based Compliance</th>
                                            </tr>
                                            <tr style={{ backgroundColor: "#cfe2ff", color: "#333" }}>
                                                <th className="fw-bold">Regulation reference</th>
                                                <th className="fw-bold">When to comply</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>{row.ref}</td>
                                                    <td className="text-muted">{row.when}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION: CORPORATE ACTIONS */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("Corporate Actions")}
                        >
                            <span className="fw-bold small text-dark">Corporate Actions</span>
                            <i className={`bi bi-${expandedSections["Corporate Actions"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["Corporate Actions"] && (
                            <div className="p-3 border-top">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <i className="bi bi-check-lg text-danger fw-bold"></i>
                                    <span className="fw-bold small text-uppercase">Check Notice Period</span>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 align-middle small" style={{ fontSize: "11px" }}>
                                        <thead className="text-white">
                                            <tr style={{ backgroundColor: "#cfe2ff", color: "#333" }}>
                                                <th className="fw-bold">CORPORATE ACTIONS</th>
                                                <th className="fw-bold"></th>
                                                <th className="fw-bold text-center">MODE OF FILING</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {corporateData.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>{row.ref}</td>
                                                    <td className="text-muted">{row.when}</td>
                                                    <td className="text-center font-monospace" style={{ fontSize: "10px" }}>{row.mode}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SECTION: SAST 30 */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("SAST 30")}
                        >
                            <span className="fw-bold small text-dark">Regulation 30(1) and 30(2) – SEBI (SAST) Regulations, 2011</span>
                            <i className={`bi bi-${expandedSections["SAST 30"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["SAST 30"] && (
                            <div className="p-4 border-top small" style={{ lineHeight: "1.8", color: "#444" }}>
                                <p><strong>30(1)</strong> Every person, who together with persons acting in concert with him, holds shares or voting rights entitling him to exercise twenty-five per cent or more of the voting rights in a target company, shall disclose their aggregate shareholding and voting rights as of the <strong>thirty-first day of March</strong>, in such target company in such form as may be specified.</p>
                                <p><strong>30 (2)</strong> The promoter of every target company shall together with persons acting in concert with him, disclose their aggregate shareholding and voting rights as of the <strong>thirty-first day of March</strong>, in such target company in such form as may be specified.</p>
                                <p>The disclosures required under sub-regulation (1) and sub-regulation (2) shall be made <strong>within seven working days</strong> from the end of each financial year to;</p>
                                <ol className="ps-3 mb-3">
                                    <li>every stock exchange where the shares of the target company are listed; and</li>
                                    <li>the target company at its registered office.</li>
                                </ol>
                                <a href="#" className="text-primary text-decoration-none small d-flex align-items-center gap-1">
                                    <i className="bi bi-file-earmark-pdf"></i> Disclosure of Details of Shareholding – Revised Format (.pdf)
                                </a>
                            </div>
                        )}
                    </div>

                    {/* SECTION: SAST 29 */}
                    <div className="mb-3 border rounded overflow-hidden shadow-sm">
                        <div 
                            className="bg-light p-3 d-flex justify-content-between align-items-center cursor-pointer" 
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleSection("SAST 29")}
                        >
                            <span className="fw-bold small text-dark">Regulation 29(1) and 29(2) & Regulation 31(1) and 31(2) - SEBI (SAST) Regulations, 2011</span>
                            <i className={`bi bi-${expandedSections["SAST 29"] ? "dash" : "plus"}-circle-fill text-muted`}></i>
                        </div>
                        {expandedSections["SAST 29"] && (
                            <div className="p-4 border-top small" style={{ lineHeight: "1.8", color: "#444" }}>
                                <h6 className="fw-bold mb-3">Disclosure of acquisition and disposal.</h6>
                                <p><strong>29(1)</strong> Any acquirer who acquires shares or voting rights in a target company which taken together with shares or voting rights, if any, held by him and by persons acting in concert with him in such target company, aggregating to five per cent or more of the shares of such target company, shall disclose their aggregate shareholding and voting rights in such target company in such form as may be specified.</p>
                                <p><strong>29(2)</strong> Any acquirer, who together with persons acting in concert with him, holds shares or voting rights entitling them to five per cent or more of the shares or voting rights in a target company, shall disclose every acquisition or disposal of shares of such target company representing two per cent or more of the shares or voting rights in such target company in such form as may be specified.</p>
                                <p><strong>29(3)</strong> The disclosures required under sub-regulation (1) and sub-regulation (2) shall be made <strong>within two working days</strong> of the receipt of intimation of allotment of shares, or the acquisition of shares or voting rights in the target company to,—</p>
                                <ol className="ps-3 mb-4">
                                    <li>every stock exchange where the shares of the target company are listed; and</li>
                                    <li>the target company at its registered office.</li>
                                </ol>

                                <h6 className="fw-bold mb-3">Disclosure of encumbered shares.</h6>
                                <p><strong>31(1)</strong> The promoter of every target company shall disclose details of shares in such target company encumbered by him or by persons acting in concert with him in such form as may be specified.</p>
                                <p><strong>31(2)</strong> The promoter of every target company shall disclose details of any invocation of such encumbrance or release of such encumbrance of shares in such form as may be specified.</p>
                                <p><strong>31(3)</strong> The disclosures required under sub-regulation (1) and sub-regulation (2) shall be made <strong>within seven working days</strong> from the creation or invocation or release of encumbrance, as the case may be to,—</p>
                                <ol className="ps-3 mb-4">
                                    <li>every stock exchange where the shares of the target company are listed; and</li>
                                    <li>the target company at its registered office.</li>
                                </ol>

                                <div className="d-flex flex-column gap-2">
                                    <a href="#" className="text-primary text-decoration-none small d-flex align-items-center gap-1">
                                        <i className="bi bi-file-earmark-pdf"></i> Download Regulation 29 (.pdf)
                                    </a>
                                    <a href="#" className="text-primary text-decoration-none small d-flex align-items-center gap-1">
                                        <i className="bi bi-file-earmark-pdf"></i> Download Regulation 31 (.pdf)
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* ⭐ TABLE TITLE */}
                    <div className="text-center mb-4">
                        <h6 className="fw-bold text-dark text-uppercase small" style={{ letterSpacing: "1px" }}>
                            COMPLIANCE CALENDAR FOR {activeTab.toUpperCase()} FOR FY 2025-26
                        </h6>
                    </div>

                    {/* ⭐ DATA TABLE */}
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle small">
                            <thead className={`text-white ${activeTab === "LLPs" ? 'bg-purple' : activeTab === "Private Company" ? 'bg-primary' : 'bg-danger'}`} style={{ backgroundColor: activeTab === "LLPs" ? "#9d7cc4" : activeTab === "Private Company" ? "#7da8d8" : "#d87d7d" }}>
                                <tr>
                                    <th className="text-center fw-bold py-3" style={{ width: "80px", color: "white" }}>Sr. No.</th>
                                    <th className="fw-bold py-3" style={{ width: "250px", color: "white" }}>Form/Compliance</th>
                                    <th className="fw-bold py-3" style={{ color: "white" }}>Description</th>
                                    <th className="text-center fw-bold py-3" style={{ width: "200px", color: "white" }}>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.length > 0 ? (
                                    currentData.map((item, idx) => {
                                        let rowBg = "#fff";
                                        if (activeTab === "Private Company" && idx % 2 === 0) rowBg = "#f0f7ff"; // Light blue
                                        if (activeTab === "Public / Deemed Public Companies" && idx % 2 === 0) rowBg = "#fdf2f2"; // Light red
                                        if (activeTab === "LLPs" && idx % 2 === 0) rowBg = "#f8f4ff"; // Light purple

                                        return (
                                            <tr key={idx} style={{ backgroundColor: rowBg }}>
                                                <td className="text-center fw-bold py-3">{idx + 1}</td>
                                                <td className="py-3">{item.form}</td>
                                                <td className="py-3 text-muted">{item.desc}</td>
                                                <td className="text-center fw-bold py-3">{item.due}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-5 text-muted fst-italic">
                                            Data for {activeTab} is currently being updated.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ComplianceCalendarView;
