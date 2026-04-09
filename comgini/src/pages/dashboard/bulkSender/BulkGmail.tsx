import { useState, useEffect } from "react";
import bulkService from "../../../services/bulkService";
import toast from "react-hot-toast";

export default function BulkGmail() {
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [formState, setFormState] = useState({
        emails: "",
        subject: "",
        body: ""
    });

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const res = await bulkService.getGmailCampaigns();
            const data = res.data?.data || res.data || [];
            setCampaigns(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleSend = async () => {
        if (!formState.emails || !formState.subject || !formState.body) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            const emailList = formState.emails.split(",").map(e => e.trim()).filter(e => e !== "");
            await bulkService.sendGmail({
                subject: formState.subject,
                body: formState.body,
                emails: emailList
            });
            toast.success("Gmail campaign initiated successfully");
            setFormState({ emails: "", subject: "", body: "" });
            fetchCampaigns();
        } catch (error: any) {
            toast.error(error.message || "Failed to send Gmails");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container-fluid">

            {/* ================= HEADER ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

                <h6 className="m-0 d-flex align-items-center gap-2">

                    {/* ⭐ Gmail M Logo (Embedded) */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                        alt="gmail"
                        style={{ width: "20px", height: "20px", objectFit: "contain" }}
                    />

                    Bulk Gmail Sender
                </h6>

                <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-danger btn-sm">Add Template</button>
                    <button className="btn btn-danger btn-sm">Director Database</button>
                    <button className="btn btn-danger btn-sm">Shareholder Database</button>
                    <button className="btn btn-danger btn-sm">Authentication</button>
                </div>

            </div>


            {/* ================= SINGLE BOX WITH DIVIDER ================= */}
            <div className="card mb-3">

                <div className="row g-0">

                    {/* LEFT SIDE */}
                    <div className="col-lg-6 p-3">
                        <div className="bg-danger text-white p-2 rounded mb-3">
                            Emails (Comma separated)
                        </div>
                        <textarea 
                            className="form-control mb-2" 
                            rows={3} 
                            placeholder="e.g. user1@example.com, user2@example.com"
                            value={formState.emails}
                            onChange={(e) => setFormState(prev => ({ ...prev, emails: e.target.value }))}
                        />
                        <div className="bg-danger text-white p-2 rounded mb-3 small py-1">
                            Subject
                        </div>
                        <input 
                            type="text" 
                            className="form-control mb-2" 
                            placeholder="Enter Subject"
                            value={formState.subject}
                            onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                        />
                        <div className="d-flex gap-2 mt-3">
                            <button className="btn btn-danger btn-sm" onClick={handleSend} disabled={loading}>
                                {loading ? "Processing..." : "Send Bulk Gmail"}
                            </button>
                        </div>
                    </div>



                    {/* RIGHT SIDE */}
                    <div className="col-lg-6 border-start p-3">
                        <div className="bg-danger text-white p-2 rounded mb-3 w-100">
                            Email Body
                        </div>
                        <textarea 
                            className="form-control" 
                            rows={8} 
                            placeholder="Type your email content here..."
                            value={formState.body}
                            onChange={(e) => setFormState(prev => ({ ...prev, body: e.target.value }))}
                        />
                    </div>


                </div>

            </div>


            {/* ⭐ CENTER TEXT */}
            <div className="text-center mb-3 small">
                10/10 Free Gmail Campaign Available.
            </div>


            {/* ================= TABLE SECTION ================= */}
            <div className="card p-3">

                <h6 className="mb-2">Previous Gmail Campaigns</h6>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">

                    <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-light btn-sm">Show 10 rows</button>
                        <button className="btn btn-light btn-sm">Excel</button>
                        <button className="btn btn-light btn-sm">Column Visibility</button>
                    </div>

                    <div style={{ position: "relative" }}>
                        <i
                            className="bi bi-search"
                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                fontSize: "13px",
                                color: "#888",
                                pointerEvents: "none"
                            }}
                        />
                        <input
                            className="form-control form-control-sm"
                            placeholder="Search"
                            style={{
                                width: "180px",
                                paddingLeft: "28px"
                            }}
                        />
                    </div>

                </div>


                <div style={{ overflowX: "auto" }}>
                    <table className="table table-bordered mb-0">

                        <thead>
                            <tr>
                                <th>Sr. No</th>
                                <th>Date of Sending Message</th>
                                <th>Sent By</th>
                                <th>Total Contacts</th>
                                <th>Sent</th>
                                <th>Failed</th>
                                <th>Message</th>
                                <th>Attachment</th>
                                <th>Export Result</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-muted">Loading...</td>
                                </tr>
                            ) : campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center">No data available in table</td>
                                </tr>
                            ) : (
                                campaigns.map((c, i) => (
                                    <tr key={c.id || i}>
                                        <td>{i + 1}</td>
                                        <td>{c.dateOfSending ? new Date(c.dateOfSending).toLocaleString() : "-"}</td>
                                        <td>{c.sentBy || "Tapas Jena"}</td>
                                        <td>{c.totalContacts || 0}</td>
                                        <td className="text-success">{c.sent || 0}</td>
                                        <td className="text-danger">{c.failed || 0}</td>
                                        <td title={c.message}>{c.subject || "-"}</td>
                                        <td>{c.attachment ? "Yes" : "No"}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-info">
                                                <i className="bi bi-download"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>


                    </table>
                </div>


                <div className="d-flex justify-content-between align-items-center mt-2">

                    <small>Showing 0 to 0 of 0 entries</small>

                    <div className="d-flex gap-2">
                        <button className="btn btn-light btn-sm">Previous</button>
                        <button className="btn btn-light btn-sm">Next</button>
                    </div>

                </div>

            </div>

        </div>
    )
}
