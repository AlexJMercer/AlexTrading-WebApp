import { useSocket } from "../Hooks/useSocket";
import { useTradingLogic } from "../Hooks/useTradingLogic";

import { TradingChart } from "../Components/TradingChart";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { Button } from "@/Components/UI/button";
import { Table, TableBody, TableCell, TableRow } from "@/Components/UI/table";
import { Wallet, Percent, Activity, TrendingUp } from "lucide-react";



export default function TradePage() {
    const liveData = useSocket();
    const { trades, statistics, wallet, executeTrade } = useTradingLogic();

    const latestDataPoint = liveData.length > 0 ? liveData[liveData.length - 1] : null;
    const currentPrice = latestDataPoint?.close || 0;
    const currentTime = latestDataPoint?.time;


    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-100 p-4 gap-4 overflow-hidden">

            {/* Main Content: Chart & Controls */}
            <div className="flex-1 flex flex-col gap-4">
                <Card className="bg-zinc-900 border-zinc-800 flex-1 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-zinc-950/80 p-2 rounded border border-zinc-800">
                        <TrendingUp className="text-green-500 w-5 h-5" />
                        <span className="font-mono font-bold text-lg">${currentPrice.toFixed(2)}</span>
                    </div>
                    <CardContent className="p-0 h-full">
                        <TradingChart data={ liveData } trades={ trades } />
                    </CardContent>
                </Card>

                {/* Execution Bar */}
                <div className="flex gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-xl justify-center items-center shadow-lg">
                    <Button
                        size        =   "lg"
                        className   =   "bg-green-600 hover:bg-green-500 w-48 h-14 text-lg font-black shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                        disabled    =   { !latestDataPoint }
                        onClick     =   { () => executeTrade('buy', currentPrice, currentTime) }
                    >
                        BUY / LONG
                    </Button>
                    <Button
                        size        =   "lg"
                        variant     =   "destructive"
                        className   =   "w-48 h-14 text-lg font-black shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                        disabled    =   { !latestDataPoint }
                        onClick     =   { () => executeTrade('sell', currentPrice, currentTime) }
                    >
                        SELL / SHORT
                    </Button>
                </div>

                {/* Sidebar: Stats & Wallet */}
                <div className="w-80 flex flex-col gap-4 overflow-y-auto">
                    <Card className="bg-zinc-900 border-zinc-800 shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                            <Wallet className="w-4 h-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${wallet.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800 flex-1 shadow-xl">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Activity className="w-4 h-4 text-orange-500" />
                                Performance Metrics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                                        <TableCell className="text-zinc-400 py-3">Total PnL</TableCell>
                                        <TableCell className={`text-right font-mono ${statistics.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                                            {statistics.pnl >= 0 ? '+' : ''}{statistics.pnl.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                                        <TableCell className="text-zinc-400 py-3">Trades Executed</TableCell>
                                        <TableCell className="text-right font-mono">{statistics.numTrades}</TableCell>
                                    </TableRow>
                                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                                        <TableCell className="text-zinc-400 py-3 flex items-center gap-1">
                                            Win Rate <Percent className="w-3 h-3" />
                                        </TableCell>
                                        <TableCell className="text-right font-mono">{statistics.winRate.toFixed(1)}%</TableCell>
                                    </TableRow>
                                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                                        <TableCell className="text-zinc-400 py-3">Sharpe Ratio</TableCell>
                                        <TableCell className="text-right font-mono text-blue-400">{statistics.sharpeRatio.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                
            </div>
        </div>
    );
}