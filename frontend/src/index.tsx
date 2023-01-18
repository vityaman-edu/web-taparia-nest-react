import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const APP_NAME = "Taparia"

root.render(
  <React.StrictMode>
    <h1>Welcome to {APP_NAME}, man!</h1>
    <App />
  </React.StrictMode>
);
