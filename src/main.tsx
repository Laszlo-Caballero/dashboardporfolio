import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "componentsla/style.css";

import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./Context/UserContext.tsx";
import { Toaster } from "componentsla";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster position="top-right" />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
