import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

import LandingPage from "./landing";
import "./landing.css";

const Dashboard = lazy(() => import("./dashboard"));

function App() {
  const path = window.location.pathname;

  // Dashboard continua em /dashboard
  if (path === "/dashboard") {
    return (
      <Suspense
        fallback={
          <div className="dashboard-loading">
            Carregando dashboard...
          </div>
        }
      >
        <Dashboard />
      </Suspense>
    );
  }

  // Página principal
  return <LandingPage />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);