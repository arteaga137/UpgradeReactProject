import React from "react";
import ReactDOM from "react-dom/client.js";
import App from "./App.jsx";
import "./index.css";

// Import, in the main entry point, BrowserRouter from React Router Dom to wrap the app and enable Single Page Application (SPA)
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
