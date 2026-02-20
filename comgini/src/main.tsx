import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"

/* ⭐ GLOBAL STYLES */
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/dashboard.css"   // ← IMPORTANT (new)
import "./index.css"

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
