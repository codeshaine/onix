// import { mnemonicToSeed } from "bip39";
// import { useAppContext } from "../context/WalletDetails";
// import nacl from "tweetnacl";
// import { Keypair } from "@solana/web3.js";
// import { derivePath } from "ed25519-hd-key";

// export default function GenerateSolWallet() {
//   const { mnemonic, solWallets, SetSolWallets } = useAppContext();

//   async function generateWallet() {
//     const seed = await mnemonicToSeed(mnemonic);
//     const path = `m/44'/501'/${solWallets.length}'/0'`;
//     const derivedSeed = derivePath(path, seed.toString("hex")).key;
//     const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
//     const keypair = Keypair.fromSecretKey(secret);

//     SetSolWallets([
//       ...solWallets,
//       {
//         address: keypair.publicKey.toBase58(),
//         publicKey: keypair.publicKey,
//         privateKey: keypair.secretKey,
//       },
//     ]);
//   }

//   return (
//     <>
//       <div>
//         <h1>Mnemonic: </h1>
//         <p>{mnemonic.toString()}</p>
//       </div>
//       <button className="border-2" onClick={generateWallet}>
//         generate new wallet
//       </button>
//     </>
//   );
// }

import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useAppContext } from "../context/WalletDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Plus,
  Copy,
  Check,
  Eye,
  EyeOff,
  Wallet as WalletIcon,
  Key,
  Hash,
  AlertTriangle,
  Trash2,
} from "lucide-react";

export default function GenerateSolWallet() {
  const { mnemonic, solWallets, setSolWallets } = useAppContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedItems, setCopiedItems] = useState<
    Record<string | number, boolean>
  >({});
  const [showPrivateKeys, setShowPrivateKeys] = useState<
    Record<string | number, boolean>
  >({});
  const [expandedWallet, setExpandedWallet] = useState<number | null>(null);

  async function generateWallet() {
    if (!mnemonic) {
      alert("Please generate a mnemonic first!");
      return;
    }

    setIsGenerating(true);
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${solWallets.length}'/0'`; // Solana BIP44 path
      const { key } = derivePath(path, seed.toString("hex"));
      const keypair = Keypair.fromSeed(key.slice(0, 32));
      setSolWallets([
        ...solWallets,
        {
          privateKey: Buffer.from(keypair.secretKey).toString("hex"),
          publicKey: keypair.publicKey.toBase58(),
          index: solWallets.length,
        },
      ]);
    } catch (err) {
      console.error("Error generating Solana wallet:", err);
      alert("Failed to generate wallet. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedItems((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const togglePrivateKey = (index: string | number) => {
    setShowPrivateKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const removeWallet = (indexToRemove: number) => {
    setSolWallets(solWallets.filter((_, index) => index !== indexToRemove));
  };

  const toggleWalletExpansion = (index: number) => {
    setExpandedWallet(expandedWallet === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {mnemonic && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Key className="w-4 h-4" />
              Recovery Phrase
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm text-slate-300 break-all">
              {mnemonic}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={generateWallet}
        disabled={!mnemonic || isGenerating}
        className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Wallet...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Generate New Solana Wallet
          </div>
        )}
      </Button>

      {!mnemonic && (
        <Alert className="border-amber-500/20 bg-amber-500/10">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-200">
            Please generate a mnemonic phrase first to create wallets.
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <WalletIcon className="w-5 h-5" />
              Generated Wallets
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-green-500/20 text-green-400 border-green-500/30"
            >
              {solWallets.length} Wallet{solWallets.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {solWallets.length === 0 ? (
            <div className="text-center py-8">
              <WalletIcon className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No wallets generated yet</p>
              <p className="text-sm text-slate-500">
                Click the button above to create your first wallet
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {solWallets.map((wallet, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 rounded-lg border border-slate-700/30"
                >
                  <div
                    className="p-4 cursor-pointer hover:bg-slate-800/30 transition-colors"
                    onClick={() => toggleWalletExpansion(idx)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            Wallet #{idx + 1}
                          </p>
                          <p className="text-sm text-slate-400 font-mono">
                            {wallet.publicKey.slice(0, 8)}...
                            {wallet.publicKey.slice(-6)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(wallet.publicKey, `address-${idx}`);
                          }}
                          className="text-slate-400 hover:text-white"
                        >
                          {copiedItems[`address-${idx}`] ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeWallet(idx);
                          }}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {expandedWallet === idx && (
                    <div className="px-4 pb-4 space-y-3 border-t border-slate-700/30">
                      {/* Public Key */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-300">
                            Public Key
                          </span>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                          <code className="text-sm text-slate-300 font-mono break-all">
                            {wallet.publicKey}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                wallet.publicKey,
                                `public-key-${idx}`
                              )
                            }
                            className="text-slate-400 hover:text-white ml-2"
                          >
                            {copiedItems[`public-key-${idx}`] ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Secret Key */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Key className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-300">
                              Secret Key
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePrivateKey(idx)}
                            className="text-slate-400 hover:text-white"
                          >
                            {showPrivateKeys[idx] ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                          <code className="text-sm text-slate-300 font-mono break-all">
                            {showPrivateKeys[idx]
                              ? wallet.privateKey
                              : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                          </code>
                          {showPrivateKeys[idx] && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  wallet.privateKey,
                                  `secret-key-${idx}`
                                )
                              }
                              className="text-slate-400 hover:text-white ml-2"
                            >
                              {copiedItems[`secret-key-${idx}`] ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
