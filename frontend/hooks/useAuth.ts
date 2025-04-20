// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // initial check
    checkAuth();

    // re-check when either the storage changes (other tabs) or we dispatch our own event
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-changed", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-changed", checkAuth);
    };
  }, []);

  return { isAuthenticated };
}
