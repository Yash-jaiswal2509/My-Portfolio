import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./lib/react-query-provider";
import { ThemeProvider } from "./lib/theme-provider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
