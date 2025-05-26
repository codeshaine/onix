import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/WalletDetails";
import React from "react";

export const UnlockedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isUnlocked } = useAppContext();

  if (!isUnlocked) {
    return <Navigate to="/password" replace />;
  }

  return children;
};
