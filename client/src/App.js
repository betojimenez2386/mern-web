import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AdminRouter } from "./router/AdminRouter";
import { WebRouter } from "./router/WebRouter";
import { AuthProvider } from "./contexts";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminRouter />
        <WebRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}
