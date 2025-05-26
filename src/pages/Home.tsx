import { useState } from "react";
import GenerateEthWallet from "../components/GenerateEthWallet";
import GenerateSolWallet from "../components/GenerateSolWallets";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Settings,
  TrendingUp,
  Shield,
  Coins,
  Activity,
  ChevronRight,
  Star,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("ethereum");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Wallet Dashboard
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Manage your crypto wallets securely
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400 border-green-500/30"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Secure
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Wallets</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Networks</p>
                    <p className="text-2xl font-bold text-white">2</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Security</p>
                    <p className="text-sm font-medium text-green-400">
                      Enhanced
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <p className="text-sm font-medium text-blue-400">Active</p>
                  </div>
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Wallet Sections */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black/40 backdrop-blur-xl border-slate-800/50 mb-6">
              <TabsTrigger
                value="ethereum"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Ξ</span>
                  </div>
                  Ethereum
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="solana"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <Coins className="w-3 h-3 text-white" />
                  </div>
                  Solana
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ethereum" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">Ξ</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">
                          Ethereum Wallets
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          Generate and manage your Ethereum wallets
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-blue-500/30 text-blue-400"
                    >
                      ETH Network
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <GenerateEthWallet />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solana" className="mt-0">
              <Card className="bg-black/40 backdrop-blur-xl border-slate-800/50 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">
                          Solana Wallets
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          Generate and manage your Solana wallets
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-purple-400"
                    >
                      SOL Network
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <GenerateSolWallet />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/40 transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Security Center</p>
                      <p className="text-sm text-slate-400">
                        Manage wallet security
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20 hover:border-purple-400/40 transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Transaction History
                      </p>
                      <p className="text-sm text-slate-400">
                        View all transactions
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-400/40 transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                      <Star className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Favorites</p>
                      <p className="text-sm text-slate-400">
                        Quick access wallets
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
