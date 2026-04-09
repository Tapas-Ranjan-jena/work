import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SubscriptionPlans.css";

interface PlanFeature {
  name: string;
  subtitle: string;
  price: string;
  billing: string;
  features: string[];
  isPro: boolean;
}

interface PlansData {
  monthly: PlanFeature[];
  yearly: PlanFeature[];
}

const plans: PlansData = {
  monthly: [
    {
      name: "Basic Plan",
      subtitle: "Small businesses & beginners",
      price: "499",
      billing: "Per Month",
      features: [
        "Manage up to 10 Clients",
        "Basic Compliance Tracking",
        "MCA Filing Support (Limited)",
        "Task Management (Basic)",
        "Email Notifications",
        "Document Storage (5 GB)",
        "Standard Support",
      ],
      isPro: false,
    },
    {
      name: "Pro Plan",
      subtitle: "Growing firms & professionals",
      price: "1,199",
      billing: "Per Month",
      features: [
        "Manage up to 50 Clients",
        "Advanced Compliance Tracking",
        "MCA Filing Automation",
        "Smart Alerts & Reminders",
        "Task & Workflow Management",
        "Team Collaboration",
        "Document Storage (25 GB)",
        "Priority Support",
      ],
      isPro: true,
    },
    {
      name: "Enterprise Plan",
      subtitle: "Large teams & corporates",
      price: "2,999",
      billing: "Per Month",
      features: [
        "Unlimited Clients",
        "Full Compliance Automation",
        "AI-Based Filing Assistance",
        "Advanced Reporting & Analytics",
        "Multi-User Access (Team Roles)",
        "API Integration",
        "Unlimited Document Storage",
        "Dedicated Account Manager",
        "24/7 Premium Support",
      ],
      isPro: false,
    },
  ],
  yearly: [
    {
      name: "Basic Plan",
      subtitle: "Small businesses & beginners",
      price: "4,999",
      billing: "Per Year",
      features: [
        "Manage up to 10 Clients",
        "Basic Compliance Tracking",
        "MCA Filing Support (Limited)",
        "Task Management (Basic)",
        "Email Notifications",
        "Document Storage (5 GB)",
        "Standard Support",
      ],
      isPro: false,
    },
    {
      name: "Pro Plan",
      subtitle: "Growing firms & professionals",
      price: "12,999",
      billing: "Per Year",
      features: [
        "Manage up to 50 Clients",
        "Advanced Compliance Tracking",
        "MCA Filing Automation",
        "Smart Alerts & Reminders",
        "Task & Workflow Management",
        "Team Collaboration",
        "Document Storage (25 GB)",
        "Priority Support",
      ],
      isPro: true,
    },
    {
      name: "Enterprise Plan",
      subtitle: "Large teams & corporates",
      price: "29,999",
      billing: "Per Year",
      features: [
        "Unlimited Clients",
        "Full Compliance Automation",
        "AI-Based Filing Assistance",
        "Advanced Reporting & Analytics",
        "Multi-User Access (Team Roles)",
        "API Integration",
        "Unlimited Document Storage",
        "Dedicated Account Manager",
        "24/7 Premium Support",
      ],
      isPro: false,
    },
  ],
};

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);
  const [successPlan, setSuccessPlan] = useState("");

  useEffect(() => {
    // Check if we just returned from a successful payment
    if (location.state?.success) {
      setIsSuccess(true);
      setSuccessPlan(location.state.planName);
      // Clean up state
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleUpgrade = (plan: PlanFeature) => {
    navigate("/subscription/checkout", { state: { plan } });
  };

  return (
    <div className="subscription-container bg-white pb-5">
      {/* Success Notification */}
      {isSuccess && (
        <div className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg border-0" 
             style={{ zIndex: 11000, borderRadius: '12px', padding: '15px 30px' }}>
          <i className="bi bi-check-circle-fill me-2"></i>
          Plan upgraded successfully! Welcome to the <strong>{successPlan}</strong>.
        </div>
      )}

      {/* Hero Section */}
      <div className="subscription-hero text-center text-white pt-5 pb-4 px-3">
        <h1 className="fw-bold mb-3 font-serif">Choose a Plan That Works for You</h1>
        <p className="opacity-75 mx-auto mb-4" style={{ maxWidth: "700px", fontSize: "15px" }}>
          Choose a plan designed to simplify your compliance and streamline your workflow. Get the
          right tools to manage, track, and scale your business operations efficiently.
        </p>

        {/* Improved Toggle Buttons inside Hero */}
        <div className="d-flex justify-content-center">
          <div className="billing-toggle-container p-1 rounded-pill d-inline-flex gap-1 shadow-sm">
            <button
              className={`toggle-btn ${billingCycle === "monthly" ? "active" : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn ${billingCycle === "yearly" ? "active" : ""}`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        <h3 className="text-center fw-bold font-serif mb-5 text-dark">Annual Compliance Plans</h3>

        {/* Pricing Cards */}
        <div className="row g-4 justify-content-center">
          {plans[billingCycle].map((plan, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className={`card h-100 border-0 shadow-sm custom-card-radius ${
                  plan.isPro ? "pro-card text-white" : "bg-light-gray"
                }`}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <div className="text-center mb-4">
                    <h5 className="fw-bold mb-1 font-serif">{plan.name}</h5>
                    <p className={`small mb-4 ${plan.isPro ? "opacity-75 text-white" : "text-muted"}`}>
                      {plan.subtitle}
                    </p>

                    <div
                      className={`pricing-box rounded py-3 ${
                        plan.isPro ? "bg-white text-dark" : "bg-box-gray text-dark"
                      }`}
                    >
                      <h2 className="fw-bold mb-0">
                        <span style={{ fontFamily: "Arial" }}>₹</span>{plan.price}
                      </h2>
                      <span className="small text-muted">{plan.billing}</span>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="mb-3 d-flex align-items-start gap-2 fs-8">
                        <i className={`bi bi-check-circle-fill ${plan.isPro ? "text-white" : "text-dark"}`} style={{ fontSize: "14px", marginTop: "2px" }}></i>
                        <span className={plan.isPro ? "text-white opacity-90" : "text-dark"}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`btn w-100 py-2 rounded-2 fw-medium ${
                      plan.isPro ? "btn-light text-dark-blue mt-auto" : "btn-outline-dark-blue mt-auto"
                    }`}
                    style={plan.isPro ? {} : { background: "#2b569e", color: "white", border: "none" }}
                    onClick={() => handleUpgrade(plan)}
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
