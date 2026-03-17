"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export default function Toaster() {
  return (
    <HotToaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: { duration: 3000 },
        error: { duration: 5000 },
      }}
    />
  );
}
