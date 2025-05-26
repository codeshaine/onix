import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/WalletDetails";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { mnemonic } = useAppContext();

  if (!mnemonic || (mnemonic && mnemonic.length == 0)) {
    return <Navigate to="/pre" replace />;
  }

  return children;
};
