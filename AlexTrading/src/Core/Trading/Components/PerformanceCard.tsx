import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { Table, TableBody, TableCell, TableRow } from "@/Components/UI/table";

import { Percent, Activity } from "lucide-react";


export default function PerformanceCard({ statistics }) {
    return (
        <Card className="bg-zinc-900 border-x border-t border-b border-zinc-800 flex-1 shadow-xl rounded-none">
            
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-large flex items-center gap-4 text-white">
                    <Activity className="w-7 h-7 text-orange-400" />
                    Performance Metrics
                </CardTitle>
            </CardHeader>
            
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell className="text-zinc-400 py-3">
                                Total PnL
                            </TableCell>
                            <TableCell className={`text-right font-mono ${statistics.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {statistics.pnl >= 0 ? '+' : ''}{statistics.pnl.toFixed(2)}
                            </TableCell>
                        </TableRow>
                        
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell className="text-zinc-400 py-3">
                                Trades Executed
                            </TableCell>
                            <TableCell className="text-right font-mono text-white">
                                {statistics.numTrades}
                            </TableCell>
                        </TableRow>
                        
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell className="text-zinc-400 py-3 flex items-center gap-1">
                                Win Rate <Percent className="w-3 h-3" />
                            </TableCell>
                            <TableCell className="text-right font-mono text-white">
                                {statistics.winRate.toFixed(2)}%
                            </TableCell>
                        </TableRow>
                        
                        <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell className="text-zinc-400 py-3">
                                Sharpe Ratio
                            </TableCell>
                            <TableCell className="text-right font-mono text-cyan-300">
                                {statistics.sharpeRatio.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}