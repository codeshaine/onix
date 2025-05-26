// import { createContext, useContext, useState } from "react";

// const AppContext = createContext(undefined);

// //{
// //   mnemonic: "",
// //   eth: [],
// //   sol: [],
// // }
// //{
// //   privateKey: "",
// //   publicKey: "",
// //   address: "",
// // }

// export function AppProvider({ children }) {
//   const [mnemonic, setMnemonic] = useState("");
//   const [ethWallets, setEthWallets] = useState([]);
//   const [solWallets, setSolWallets] = useState([]);
//   const [isUnlocked, setIsUnlocked] = useState(false);
//   // useEffect(() => {
//   //   chrome.storage.local.get(
//   //     ["mnemonic", "ethWallets", "solWallets"],
//   //     (result) => {
//   //       if (result.mnemonic) setMnemonic(result.mnemonic);
//   //       if (result.ethWallets) setEthWallets(result.ethWallets);
//   //       if (result.solWallets) setSolWallets(result.solWallets);
//   //     },
//   //   );
//   // }, []);

//   // // Persist on change
//   // useEffect(() => {
//   //   chrome.storage.local.set({ mnemonic });
//   // }, [mnemonic]);

//   // useEffect(() => {
//   //   chrome.storage.local.set({ ethWallets });
//   // }, [ethWallets]);

//   // useEffect(() => {
//   //   chrome.storage.local.set({ solWallets });
//   // }, [solWallets])
//   return (
//     <AppContext.Provider
//       value={{
//         mnemonic,
//         setMnemonic,
//         ethWallets,
//         setEthWallets,
//         solWallets,
//         setSolWallets,
//         isUnlocked,
//         setIsUnlocked,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context)
//     throw new Error("useAppContext must be used within AppProvider");
//   return context;
// }

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface EthWallet {
  privateKey: string;
  publicKey: string;
  address: string;
  index: number;
}

interface SolWallet {
  privateKey: string;
  publicKey: string;
  address?: string;
  index: number;
}

interface AppContextType {
  mnemonic: string;
  setMnemonic: React.Dispatch<React.SetStateAction<string>>;
  ethWallets: EthWallet[];
  setEthWallets: React.Dispatch<React.SetStateAction<EthWallet[]>>;
  solWallets: SolWallet[];
  setSolWallets: React.Dispatch<React.SetStateAction<SolWallet[]>>;
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [ethWallets, setEthWallets] = useState<EthWallet[]>([]);
  const [solWallets, setSolWallets] = useState<SolWallet[]>([]);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        mnemonic,
        setMnemonic,
        ethWallets,
        setEthWallets,
        solWallets,
        setSolWallets,
        isUnlocked,
        setIsUnlocked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
