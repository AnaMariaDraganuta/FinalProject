import { Router } from "express";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
