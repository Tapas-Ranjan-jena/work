import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import "./EditProfile.css";

export default function EditProfile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form states
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [gender, setGender] = useState(user?.gender || "Male");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [companyName, setCompanyName] = useState(user?.companyName || "");
    const [gstNo, setGstNo] = useState(user?.gstNo || "");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // Photo state
    const [photoPreview, setPhotoPreview] = useState<string | null>(user?.avatar || null);

    // Background color options
    const bgGradients = [
        { name: "Blue", value: "linear-gradient(135deg, #6366f1, #3b82f6)" },
        { name: "Red", value: "linear-gradient(135deg, #f87171, #ef4444)" },
        { name: "Green", value: "linear-gradient(135deg, #34d399, #10b981)" },
        { name: "Purple", value: "linear-gradient(135deg, #a78bfa, #8b5cf6)" },
        { name: "Orange", value: "linear-gradient(135deg, #fb923c, #f97316)" },
        { name: "Pink", value: "linear-gradient(135deg, #f472b6, #ec4899)" }
    ];
    const [selectedBgColor, setSelectedBgColor] = useState(bgGradients[0].value);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword && newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                firstName,
                lastName,
                gender,
                email,
                phone,
                companyName,
                gstNo,
                avatar: photoPreview || undefined,
                ...(newPassword && { password: newPassword })
            };
            
            await updateProfile(payload);
            toast.success("Profile updated Successfully", {
                icon: '✅',
                style: {
                    borderRadius: '12px',
                    background: '#1dc47d',
                    color: '#fff',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(29, 196, 125, 0.3)'
                },
            });
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

    return (
        <div className="container-fluid p-4 edit-profile-page">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold profile-title m-0">Edit Profile</h2>
                <div className="breadcrumb-nav small text-muted">
                    Dashboard / <span className="text-primary text-decoration-none">Edit Profile</span>
                </div>
            </div>

            <form onSubmit={handleSave}>
                <div className="row g-4">
                    {/* LEFT SIDE: PHOTO & BASIC INFO */}
                    <div className="col-12 col-xl-3">
                        <div className="card border-0 shadow-sm p-4 text-center profile-photo-card h-100">
                            <div className="position-relative d-inline-block mx-auto mb-4 mt-2">
                                <div className="avatar-wrapper shadow-sm">
                                    {photoPreview ? (
                                        <img 
                                            src={photoPreview} 
                                            alt="Profile" 
                                            className="rounded-circle profile-img-large"
                                            style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div 
                                            className="avatar-large-placeholder"
                                            style={{ background: selectedBgColor }}
                                        >
                                            {initials || "?"}
                                        </div>
                                    )}
                                    <button 
                                        type="button" 
                                        className="btn-camera-upload position-absolute bottom-0 end-0 shadow"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <i className="bi bi-camera"></i>
                                    </button>
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="d-none" 
                                    accept="image/*"
                                    onChange={handlePhotoChange} 
                                />
                            </div>
                            <h4 className="fw-bold mb-1 text-dark">{firstName} {lastName}</h4>
                            <p className="text-muted small mb-4">{email}</p>
                            
                            <div className="d-flex flex-column gap-3 mt-2">
                                <button 
                                    type="button" 
                                    className="btn btn-primary-soft w-100 py-2 rounded-3 fw-bold"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Change Photo
                                </button>
                                
                                {/* Background Color Picker */}
                                <div className="color-picker-section">
                                    <p className="small fw-bold text-dark mb-3 text-center opacity-75" style={{ letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '11px' }}>
                                        Avatar Background
                                    </p>
                                    <div className="color-swatch-group">
                                        {bgGradients.map((grad) => (
                                            <div 
                                                key={grad.name}
                                                className={`color-swatch ${selectedBgColor === grad.value ? "active" : ""}`}
                                                style={{ background: grad.value }}
                                                onClick={() => setSelectedBgColor(grad.value)}
                                                title={grad.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {photoPreview && (
                                    <button 
                                        type="button" 
                                        className="btn btn-link text-danger text-decoration-none small fw-medium"
                                        onClick={() => setPhotoPreview(null)}
                                    >
                                        Remove Photo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: FORMS */}
                    <div className="col-12 col-xl-9">
                        <div className="card border-0 shadow-sm p-0 overflow-hidden">
                            <div className="bg-white p-4">
                                {/* Personal Information */}
                                <section className="profile-section">
                                    <h6 className="fw-bold section-title mb-4">
                                        <i className="bi bi-person me-2 text-primary"></i>
                                        Personal Information
                                    </h6>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">First Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control profile-input" 
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">Last Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control profile-input" 
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label profile-label d-block mb-3">Gender</label>
                                            <div className="d-flex gap-4">
                                                <div className="form-check custom-radio">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        id="male" 
                                                        name="gender" 
                                                        checked={gender === "Male"}
                                                        onChange={() => setGender("Male")}
                                                    />
                                                    <label className="form-check-label" htmlFor="male">Male</label>
                                                </div>
                                                <div className="form-check custom-radio">
                                                    <input 
                                                        className="form-check-input" 
                                                        type="radio" 
                                                        id="female" 
                                                        name="gender" 
                                                        checked={gender === "Female"}
                                                        onChange={() => setGender("Female")}
                                                    />
                                                    <label className="form-check-label" htmlFor="female">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="divider-line my-5"></div>

                                {/* Contact Information */}
                                <section className="profile-section">
                                    <h6 className="fw-bold section-title mb-4">
                                        <i className="bi bi-envelope me-2 text-primary"></i>
                                        Contact Information
                                    </h6>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope text-muted"></i></span>
                                                <input 
                                                    type="email" 
                                                    className="form-control profile-input border-start-0 ps-0" 
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="example@email.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">Phone Number</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-telephone text-muted"></i></span>
                                                <input 
                                                    type="text" 
                                                    className="form-control profile-input border-start-0 ps-0" 
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    placeholder="0123456789"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="divider-line my-5"></div>

                                {/* Business Information */}
                                <section className="profile-section">
                                    <h6 className="fw-bold section-title mb-4">
                                        <i className="bi bi-building me-2 text-primary"></i>
                                        Business Information
                                    </h6>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">Company/Firm Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control profile-input" 
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Enter company name"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">GST No</label>
                                            <input 
                                                type="text" 
                                                className="form-control profile-input" 
                                                value={gstNo}
                                                onChange={(e) => setGstNo(e.target.value)}
                                                placeholder="22AAAAA000A1Z5"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="divider-line my-5"></div>

                                {/* Change Password */}
                                <section className="profile-section">
                                    <h6 className="fw-bold section-title mb-2">
                                        <i className="bi bi-shield-lock me-2 text-primary"></i>
                                        Change Password
                                    </h6>
                                    <p className="text-muted small mb-4">Leave empty to keep your current password.</p>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">New Password</label>
                                            <div className="position-relative">
                                                <input 
                                                    type={showPassword ? "text" : "password"} 
                                                    className="form-control profile-input pe-5" 
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password"
                                                />
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 text-muted p-0 border-0 shadow-none"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label profile-label">Confirm Password</label>
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                className="form-control profile-input" 
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>
                                </section>
                            </div>
                            
                            {/* Action Footer */}
                            <div className="card-footer bg-light border-0 p-4 d-flex justify-content-end gap-3">
                                <button type="button" className="btn btn-light px-4 py-2 text-secondary fw-bold border" onClick={() => navigate("/dashboard")} disabled={loading}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary px-5 py-2 fw-bold shadow-sm" style={{ background: 'linear-gradient(45deg, #3b82f6, #2563eb)' }} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

