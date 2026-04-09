import { useState } from "react";
import "./CheckoutModal.css";

interface Plan {
  name: string;
  price: string;
  billing: string;
}

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ plan, onClose, onSuccess }: CheckoutModalProps) {
  const [activeMethod, setActiveMethod] = useState("Card");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-card" onClick={(e) => e.stopPropagation()}>
        <button className="checkout-close-btn" onClick={onClose}>&times;</button>

        <div className="checkout-header">
          <div className="checkout-logo-container">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
              alt="Razorpay" 
              className="razorpay-logo" 
            />
          </div>

          <div className="checkout-plan-info">
            <div className="checkout-subtitle">Upgrade Plan to</div>
            <h2 className="checkout-plan-name">{plan.name}</h2>
            <div className="checkout-price">₹{plan.price}</div>
            <div className="checkout-category">Compliance Plan</div>
          </div>
        </div>

        <form className="checkout-body" onSubmit={handleSubmit}>
          {/* User Info Fields */}
          <div className="checkout-input-group">
            <div className="checkout-input-wrapper">
              <i className="bi bi-envelope checkout-icon"></i>
              <input 
                type="email" 
                placeholder="tapas@email.com" 
                className="checkout-input" 
                required
                defaultValue="tapas@email.com"
              />
            </div>
          </div>

          <div className="checkout-input-group">
            <div className="checkout-input-wrapper">
              <i className="bi bi-person checkout-icon"></i>
              <input 
                type="text" 
                placeholder="Tapas Jena" 
                className="checkout-input" 
                required
                defaultValue="Tapas Jena"
              />
            </div>
          </div>

          <div className="checkout-input-group">
            <div className="checkout-phone-wrapper">
              <div className="checkout-country-code">
                <img src="https://flagcdn.com/w20/in.png" alt="IN" className="country-flag" />
                +91
              </div>
              <div className="checkout-input-wrapper">
                <input 
                  type="text" 
                  placeholder="9999999999" 
                  className="checkout-input" 
                  required
                  defaultValue="9999999999"
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods-tabs">
            <div 
              className={`method-tab ${activeMethod === "Card" ? "active" : ""}`}
              onClick={() => setActiveMethod("Card")}
            >
              <i className="bi bi-credit-card"></i>
              <span>Card</span>
            </div>
            <div 
              className={`method-tab ${activeMethod === "UPI" ? "active" : ""}`}
              onClick={() => setActiveMethod("UPI")}
            >
              <i className="bi bi-qr-code"></i>
              <span>UPI</span>
            </div>
            <div 
              className={`method-tab ${activeMethod === "Netbanking" ? "active" : ""}`}
              onClick={() => setActiveMethod("Netbanking")}
            >
              <i className="bi bi-bank"></i>
              <span>Netbanking</span>
            </div>
            <div 
              className={`method-tab ${activeMethod === "Wallet" ? "active" : ""}`}
              onClick={() => setActiveMethod("Wallet")}
            >
              <i className="bi bi-wallet2"></i>
              <span>Wallet</span>
            </div>
          </div>

          {/* Card Details Box */}
          <div className="card-details-box">
            <div className="card-number-row">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="visa-logo" />
              <input type="text" placeholder="9999999999" className="checkout-input" defaultValue="9999999999" />
            </div>
            <div className="card-info-row">
              <div className="card-info-col">
                <input type="text" placeholder="Expiry (MM/YY)" className="checkout-input" defaultValue="Expiry (MM/YY)" />
              </div>
              <div className="card-info-col">
                <input type="text" placeholder="CVV" className="checkout-input" defaultValue="CVV" />
                <i className="bi bi-question-circle cvv-hint"></i>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button type="submit" className="checkout-btn">
            Pay ₹{plan.price}
          </button>
        </form>

        {/* Trust Footers */}
        <div className="checkout-trust-footer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/McAfee_logo.svg" alt="McAfee" className="trust-badge" style={{height: '18px'}} />
          <div className="trust-badge" style={{fontSize: '10px', fontWeight: 'bold', color: '#0070bc'}}>PCI DSS</div>
          <div className="secured-by">
            Secured by | <a href="https://www.razorpay.com" target="_blank" rel="noreferrer">www.razorpay.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
