import React, { useState, useEffect } from "react";

const AttendanceLoginView: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginType, setLoginType] = useState<string | null>(null);
    const [loginTime, setLoginTime] = useState<string | null>(null);
    const [loginDate, setLoginDate] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        const storedStatus = localStorage.getItem("attendance_status");
        if (storedStatus === "in") {
            setIsLoggedIn(true);
            setLoginType(localStorage.getItem("attendance_type"));
            setLoginTime(localStorage.getItem("attendance_time"));
            setLoginDate(localStorage.getItem("attendance_date"));
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
            if (showDropdown && !(e.target as HTMLElement).closest('.attendance-dropdown-container')) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showDropdown]);

    const handleLogin = (type: "WFO" | "WFH") => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const dateStr = now.toLocaleDateString('en-GB').split('/').join('-'); // DD-MM-YYYY

        setIsLoggedIn(true);
        setLoginType(type);
        setLoginTime(timeStr);
        setLoginDate(dateStr);
        setShowDropdown(false);

        localStorage.setItem("attendance_status", "in");
        localStorage.setItem("attendance_type", type);
        localStorage.setItem("attendance_time", timeStr);
        localStorage.setItem("attendance_date", dateStr);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoginType(null);
        setLoginTime(null);
        setLoginDate(null);
        localStorage.removeItem("attendance_status");
        localStorage.removeItem("attendance_type");
        localStorage.removeItem("attendance_time");
        localStorage.removeItem("attendance_date");
    };

    return (
        <div className="attendance-login-container">
            {/* Header section similar to provided design */}
            <div 
                className="card shadow-sm border-0 mb-4 p-0" 
                style={{ 
                    borderRadius: "16px",
                    background: isLoggedIn ? "#17a2b8" : "#f36c53",
                    transition: "all 0.5s ease",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}
            >
                <div 
                    className="p-3 p-md-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-white position-relative"
                    style={{ minHeight: "130px" }}
                >
                    {/* LEFT SIDE - ICON & TEXT */}
                    <div className="d-flex align-items-center gap-3 gap-md-5 mb-3 mb-md-0">
                        <div className="clock-icon-bg d-none d-sm-block" style={{ opacity: "0.2" }}>
                            <i className="bi bi-clock" style={{ fontSize: "clamp(40px, 8vw, 70px)" }}></i>
                        </div>
                        
                        <div className="text-start z-1">
                            {!isLoggedIn ? (
                                <h3 className="fw-bold mb-0 responsive-header-text">
                                    You are currently Logged out
                                </h3>
                            ) : (
                                <div className="responsive-header-text">
                                    <h3 className="fw-bold mb-2">
                                        Logged started at : {loginTime} ({loginType})
                                    </h3>
                                    <h4 className="fw-medium mb-0 opacity-75 small-responsive-text">
                                        Dated : {loginDate}
                                    </h4>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE - ACTIONS */}
                    <div className="text-end z-1 attendance-dropdown-container w-md-auto pe-md-4 align-self-center align-self-md-center">
                        {!isLoggedIn ? (
                            <div className="dropdown position-relative">
                                 <button 
                                    className="btn btn-light d-flex align-items-center justify-content-center justify-content-md-start gap-3 px-4 px-md-5 py-2 fw-bold text-dark shadow-lg border-0 no-caret-btn"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    style={{ borderRadius: "10px", fontSize: "1rem", transition: "transform 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <i className="bi bi-box-arrow-in-right h5 mb-0"></i>
                                    Log In
                                </button>
                                {showDropdown && (
                                    <ul 
                                        className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-3 p-3 overflow-hidden show" 
                                        style={{ 
                                            borderRadius: "16px", 
                                            minWidth: "220px", 
                                            animation: "slide-down 0.3s ease",
                                            display: "block",
                                            position: "absolute",
                                            right: 0,
                                            top: "100%",
                                            zIndex: 2000,
                                            boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
                                        }}
                                    >
                                        <li>
                                            <button className="dropdown-item py-3 px-4 fw-bold rounded-3 mb-2" onClick={() => handleLogin("WFO")}>
                                                <i className="bi bi-building me-3"></i> Log in as WFO
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item py-3 px-4 fw-bold rounded-3 text-primary" onClick={() => handleLogin("WFH")}>
                                                <i className="bi bi-house-door me-3"></i> Log in as WFH
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                             <button 
                                className="btn btn-light d-flex align-items-center justify-content-center justify-content-md-start gap-3 px-4 px-md-5 py-2 fw-bold text-danger shadow-lg border-0"
                                onClick={handleLogout}
                                style={{ borderRadius: "10px", fontSize: "1rem", transition: "transform 0.2s" }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <i className="bi bi-box-arrow-right h5 mb-0"></i>
                                Log Out
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ADDITIONAL DECORATION TO MATCH PREMIUM FEEL */}
            <div className="row g-4 mt-2">
                 <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: "12px" }}>
                        <h6 className="fw-bold text-muted mb-2 text-uppercase small" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>Today's Summary</h6>
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary-subtle p-2 rounded-circle text-primary">
                                <i className="bi bi-calendar-check h5 mb-0"></i>
                            </div>
                            <div>
                                <p className="mb-0 text-muted small" style={{ fontSize: "0.75rem" }}>Status</p>
                                <h6 className="fw-bold mb-0">{isLoggedIn ? "Currently Working" : "Not Logged In"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="col-md-6">
                    <div className="card border-0 shadow-sm p-3 h-100" style={{ borderRadius: "12px" }}>
                        <h6 className="fw-bold text-muted mb-2 text-uppercase small" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>Workspace</h6>
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-info-subtle p-2 rounded-circle text-info">
                                <i className={`bi ${loginType === "WFH" ? "bi-house-heart" : "bi-briefcase"} h5 mb-0`}></i>
                            </div>
                            <div>
                                <p className="mb-0 text-muted small" style={{ fontSize: "0.75rem" }}>Location</p>
                                <h6 className="fw-bold mb-0">{loginType || "None"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .no-caret-btn::after {
                    display: none !important;
                }
                .dropdown-item:hover {
                    background-color: #f8f9fa;
                    color: #2b4cb3;
                }
                .dropdown-item i {
                    font-size: 1.1rem;
                }
                 .responsive-header-text {
                    font-size: 1.1rem;
                    letter-spacing: 0.5px;
                }
                .small-responsive-text {
                    font-size: 0.9rem;
                }
                @media (min-width: 768px) {
                    .responsive-header-text {
                        font-size: 1.5rem;
                        letter-spacing: 1px;
                    }
                    .small-responsive-text {
                        font-size: 1.1rem;
                    }
                }
                @keyframes slide-down {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default AttendanceLoginView;
