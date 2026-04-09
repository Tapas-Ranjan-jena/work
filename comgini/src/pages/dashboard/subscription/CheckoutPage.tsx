import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || { plan: null };
  const [activeMethod, setActiveMethod] = useState("Card");

  if (!plan) {
    return (
      <div className="checkout-page-container">
        <div className="text-center mt-5">
          <h3>No plan selected</h3>
          <Link to="/subscription" className="btn btn-primary mt-3">Back to Plans</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/subscription", { state: { success: true, planName: plan.name } });
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-page-header">
        <Link to="/subscription" className="back-link">
          <i className="bi bi-arrow-left"></i>
          Back to Plans
        </Link>
      </div>

      <div className="checkout-split-layout">
        {/* LEFT COLUMN: ORDER SUMMARY */}
        <section className="checkout-summary-section">
          <div className="summary-brand">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
              alt="Razorpay" 
              className="razorpay-logo" 
            />
          </div>

          <p className="summary-title">Order Summary</p>
          
          <div className="plan-display">
            <h2>{plan.name}</h2>
            <div className="price-info mt-2">
              <span className="price-text">₹{plan.price}</span>
              <span className="billing-cycle">/ {plan.billing.includes("Year") ? "year" : "month"}</span>
            </div>
          </div>

          <div className="divider my-4" style={{ height: '1px', background: 'rgba(51, 97, 204, 0.1)' }}></div>

          <p className="fw-bold text-dark mb-3">What's included in this plan:</p>
          <ul className="features-list">
            {(plan.features || []).slice(0, 5).map((feature: string, idx: number) => (
              <li key={idx} className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>{feature}</span>
              </li>
            ))}
            {plan.features?.length > 5 && (
              <li className="feature-item opacity-75">
                <i className="bi bi-plus-lg"></i>
                <span>And {plan.features.length - 5} more features...</span>
              </li>
            )}
          </ul>

          <div className="summary-footer">
            <div className="trust-shield">
              <i className="bi bi-shield-check"></i>
              <div className="trust-text">
                <strong>Bank-level Security</strong>
                <p className="mb-0">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: PAYMENT FORM */}
        <section className="checkout-form-section">
          <div className="form-header">
            <h3>Complete your purchase</h3>
            <p>Enter your details and choose a payment method to get started.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="checkout-grid">
              <div className="input-container">
                <label className="input-label">Full Name</label>
                <div className="input-with-icon">
                  <i className="bi bi-person"></i>
                  <input type="text" placeholder="Tapas Jena" className="input-field" required defaultValue="Tapas Jena" />
                </div>
              </div>

              <div className="input-container">
                <label className="input-label">Email Address</label>
                <div className="input-with-icon">
                  <i className="bi bi-envelope"></i>
                  <input type="email" placeholder="tapas@email.com" className="input-field" required defaultValue="tapas@email.com" />
                </div>
              </div>
            </div>

            <div className="input-container mb-4">
              <label className="input-label">Phone Number</label>
              <div className="phone-input-group">
                <div className="country-select">
                  <img src="https://flagcdn.com/w20/in.png" alt="IN" width="16" />
                  +91
                </div>
                <div className="input-with-icon flex-grow-1 mb-0">
                  <input type="text" placeholder="9999999999" className="input-field" required defaultValue="9999999999" />
                </div>
              </div>
            </div>

            <p className="input-label mb-2">Select Payment Method</p>
            <div className="payment-methods-grid">
              {[
                { id: "Card", icon: "credit-card", label: "Card" },
                { id: "UPI", icon: "qr-code", label: "UPI" },
                { id: "Netbanking", icon: "bank", label: "Netbanking" },
                { id: "Wallet", icon: "wallet2", label: "Wallet" },
              ].map(method => (
                <div 
                  key={method.id}
                  className={`payment-method-card ${activeMethod === method.id ? "active" : ""}`}
                  onClick={() => setActiveMethod(method.id)}
                >
                  <i className={`bi bi-${method.icon}`}></i>
                  <span>{method.label}</span>
                </div>
              ))}
            </div>

            {activeMethod === "Card" && (
              <div className="card-details-form">
                <div className="input-container">
                  <label className="input-label">Card Number</label>
                  <div className="input-with-icon">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="30" className="me-2" />
                    <input type="text" placeholder="4242 4242 4242 4242" className="input-field" defaultValue="4242 4242 4242 4242" />
                  </div>
                </div>

                <div className="card-form-row">
                  <div className="input-container">
                    <label className="input-label">Expiry (MM/YY)</label>
                    <div className="input-with-icon">
                      <input type="text" placeholder="12/26" className="input-field" defaultValue="12/26" />
                    </div>
                  </div>
                  <div className="input-container">
                    <label className="input-label">CVV</label>
                    <div className="input-with-icon">
                      <input type="password" placeholder="***" className="input-field" defaultValue="123" />
                      <i className="bi bi-question-circle ms-auto" style={{ cursor: 'help' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="pay-button">
              <span>Secure Pay ₹{plan.price}</span>
              <i className="bi bi-lock-fill"></i>
            </button>

            <div className="security-badges">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/McAfee_logo.svg" alt="McAfee" />
              <img src="https://flagcdn.com/w20/in.png" alt="Compliance" style={{ filter: 'grayscale(1)', opacity: 0.5 }} />
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ccc' }}>PCI DSS COMPLIANT</div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
