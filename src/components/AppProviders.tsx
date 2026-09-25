"use client";

import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/components/PlanProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#15181e",
            color: "#fff",
            border: "1px solid #2b3039"
          },
          success: {
            iconTheme: { primary: "#c8ff00", secondary: "#08090b" }
          }
        }}
      />
    </PlanProvider>
  );
}