import { useState, useEffect } from "react";
import bulkService from "../../../services/bulkService";
import toast from "react-hot-toast";

export default function BulkWhatsapp() {
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [formState, setFormState] = useState({
        contacts: "",
        message: ""
    });

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const res = await bulkService.getWhatsAppCampaigns();
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
        if (!formState.contacts || !formState.message) {
            toast.error("Please provide contacts and a message");
            return;
        }

        try {
            setLoading(true);
            const contactList = formState.contacts.split(",").map(c => c.trim()).filter(c => c !== "");
            await bulkService.sendWhatsApp({
                message: formState.message,
                contacts: contactList
            });
            toast.success("WhatsApp campaign initiated successfully");
            setFormState({ contacts: "", message: "" });
            fetchCampaigns();
        } catch (error: any) {
            toast.error(error.message || "Failed to send WhatsApp messages");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setLoading(true);
            await bulkService.uploadWhatsAppExcel(file);
            toast.success("Excel uploaded and processed");
            fetchCampaigns();
        } catch (error: any) {
            toast.error(error.message || "Failed to upload file");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container-fluid">

            {/* ⭐ BUTTON + GREEN STYLES */}
            <style>{`
                .primary-btn{
                    background:#2E388E;
                    color:white;
                    border:none;
                    transition:all .2s ease;
                }
                .primary-btn:hover{
                    background:#242e73;
                    color:white;
                }
                .dark-green{
                    background:#056221;
                    color:white;
                }
            `}</style>


            {/* ================= HEADER ================= */}
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

                <h6 className="m-0 d-flex align-items-center gap-2">
                    <i className="bi bi-whatsapp text-success"></i>
                    Bulk WhatsApp Sender
                </h6>

                <div className="d-flex gap-2">
                    <button className="btn btn-sm primary-btn">Generate QR Code</button>
                    <button className="btn btn-sm primary-btn">Logout</button>
                </div>

            </div>

            {/* WARNING TEXT */}
            <div className="text-danger small mb-3">
                Using bulk messaging services on WhatsApp is against WhatsApp’s policies.
                Engaging in this activity may result in your number being blocked by WhatsApp.
                Please proceed with caution and understand the risks involved.
            </div>


            {/* ================= MAIN CARD ================= */}
            <div className="card mb-3">

                <div className="row g-0">

                    {/* LEFT PANEL */}
                    <div className="col-lg-6 p-3">
                        <div className="row g-2 align-items-center mb-3">
                            <div className="col-12">
                                <input type="file" className="form-control" onChange={handleFileUpload} disabled={loading} />
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <button className="btn btn-sm primary-btn" onClick={handleSend} disabled={loading}>
                                {loading ? "Processing..." : "Send Bulk WhatsApp"}
                            </button>
                        </div>
                    </div>



                    {/* RIGHT PANEL */}
                    <div className="col-lg-6 border-start p-3">

                        <div className="d-flex justify-content-between align-items-center dark-green p-2 rounded mb-2">

                            <span>Message</span>

                            <div className="d-flex gap-2">
                                <select
                                    className="form-select form-select-sm"
                                    style={{ width: "120px", height: "30px", paddingTop: "2px", paddingBottom: "2px" }}
                                >
                                    <option>Select</option>
                                </select>

                                <button
                                    className="btn btn-sm primary-btn"
                                    style={{ height:"30px", fontSize:"12px", padding:"2px 8px" }}
                                >
                                    Import from Template
                                </button>

                            </div>

                        </div>

                        <textarea
                            className="form-control mb-3"
                            rows={6}
                            placeholder="Type your message here..."
                            value={formState.message}
                            onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        />


                        {/* ATTACHMENT */}
                        <div className="dark-green p-2 rounded mb-2">
                            Attachment
                        </div>

                        <div style={{ position: "relative", width: "100%" }}>

                            <input
                                type="file"
                                className="form-control pe-5"
                            />

                            <button
                                className="btn btn-sm primary-btn"
                                style={{
                                    position: "absolute",
                                    right: "6px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    height: "30px",
                                    width: "34px",
                                    padding: "0"
                                }}
                            >
                                +
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================= FOOTER BUTTONS ================= */}
            <div className="d-flex justify-content-end gap-2 mb-3">
                <button className="btn btn-sm primary-btn">Generate QR Code</button>
                <button className="btn btn-sm primary-btn">Logout</button>
            </div>


            {/* CENTER TEXT */}
            <div className="text-center small mb-3">
                10/10 Free WhatsApp Campaign Available.
            </div>


            {/* ================= TABLE ================= */}
            <div className="card p-3">

                <h6 className="mb-2">Previous WhatsApp Campaigns</h6>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">

                    <div className="d-flex gap-2">
                        <button className="btn btn-sm primary-btn">Show 10 rows</button>
                        <button className="btn btn-sm primary-btn">Excel</button>
                        <button className="btn btn-sm primary-btn">Column Visibility</button>
                    </div>

                    <input
                        className="form-control form-control-sm"
                        placeholder="Search"
                        style={{ width: "180px" }}
                    />

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
                                    <td colSpan={9} className="text-center py-4 text-muted small">Loading...</td>
                                </tr>
                            ) : campaigns.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-muted small">No data available in table</td>
                                </tr>
                            ) : (
                                campaigns.map((c, i) => (
                                    <tr key={c.id || i} className="align-middle small">
                                        <td className="text-center">{i + 1}</td>
                                        <td>{c.dateOfSending ? new Date(c.dateOfSending).toLocaleString() : "-"}</td>
                                        <td>{c.sentBy || "Tapas Jena"}</td>
                                        <td className="text-center">{c.totalContacts || 0}</td>
                                        <td className="text-center text-success fw-bold">{c.sent || 0}</td>
                                        <td className="text-center text-danger fw-bold">{c.failed || 0}</td>
                                        <td title={c.message}>{c.message?.substring(0, 50)}...</td>
                                        <td className="text-center">{c.attachment ? "Yes" : "No"}</td>
                                        <td className="text-center">
                                            <button className="btn btn-sm btn-outline-info p-1" style={{ fontSize: "10px" }}>
                                                <i className="bi bi-download"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>

            </div>

        </div>
    )
}
