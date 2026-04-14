import React from "react";

export default function AdminGuard({ children }) {
  // Always allow access in standalone mode
  return children;
}
