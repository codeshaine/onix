import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/WalletDetails";
import bip39 from "bip39";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Shuffle,
  Copy,
  Check,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export function PrePage() {
  const navigate = useNavigate();
  const { mnemonic, setMnemonic } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  async function generateMnemonic() {
    setIsGenerating(true);
    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    const m = bip39.generateMnemonic();
    setMnemonic(m);
    setIsGenerating(false);
    setCopied(false);
  }

  const copyMnemonic = async () => {
    if (mnemonic) {
      try {
        await navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy mnemonic:", err);
      }
    }
  };

  const mnemonicWords = mnemonic ? mnemonic.split(" ") : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <Card className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border-slate-800/50 shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Generate Your Wallet
            </CardTitle>
            <CardDescription className="text-slate-400 text-lg">
              Create a secure mnemonic phrase to access your wallet
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Generate Button */}
          <Button
            onClick={generateMnemonic}
            disabled={isGenerating}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shuffle className="w-5 h-5" />
                Generate New Mnemonic
              </div>
            )}
          </Button>

          {/* Mnemonic Display */}
          {mnemonic && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-slate-300">
                    Your Recovery Phrase
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-400 border-green-500/30"
                  >
                    12 Words
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMnemonic(!showMnemonic)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showMnemonic ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyMnemonic}
                    className="text-slate-400 hover:text-white"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 min-h-[120px] flex items-center justify-center">
                {showMnemonic ? (
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {mnemonicWords.map((word, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/50 rounded-lg p-3 text-center border border-slate-600/30"
                      >
                        <div className="text-xs text-slate-400 mb-1">
                          {index + 1}
                        </div>
                        <div className="text-white font-mono font-medium">
                          {word}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-slate-400">
                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Click the eye icon to reveal your mnemonic</p>
                  </div>
                )}
              </div>

              {copied && (
                <div className="text-center">
                  <span className="text-green-400 text-sm font-medium flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Copied to clipboard!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Security Warning */}
          {mnemonic && (
            <Alert className="border-amber-500/20 bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200">
                <strong>Important:</strong> Store this mnemonic phrase securely.
                Anyone with access to it can control your wallet. Never share it
                with anyone.
              </AlertDescription>
            </Alert>
          )}

          {/* Next Button */}
          <Button
            onClick={() => navigate("/")}
            disabled={!mnemonic}
            className={`w-full h-14 font-semibold shadow-lg transition-all duration-200 ${
              mnemonic
                ? "bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-700 text-white transform hover:scale-[1.02] hover:shadow-xl"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            {mnemonic ? (
              <div className="flex items-center gap-2">
                Continue to Wallet
                <ArrowRight className="w-5 h-5" />
              </div>
            ) : (
              "Generate a mnemonic first"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
