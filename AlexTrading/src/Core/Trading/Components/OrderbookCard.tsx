import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { Table, TableBody, TableHeader, TableHead, TableCell, TableRow } from "@/Components/UI/table";
import { BookOpenText } from "lucide-react";

interface Trade {
    id: number;
    type: "buy" | "sell";
    price: number;
    quantity: number;
    time: string;
}



export default function OrderBookCard({ trades }) {
    return (
        <Card className="bg-zinc-900 border-x border-t border-zinc-800 shadow-xl rounded-none mt-1 mb-1 h-full">
            <CardHeader>
                <CardTitle className="flex gap-4 text-xl font-large text-white">
                    <BookOpenText className="w-7 h-7 text-green-400" />
                    Trade History
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto h-full p-2 pt-0 scrollbar-hide">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-zinc-300">Time</TableHead>
                            <TableHead className="text-zinc-300">Order</TableHead>
                            <TableHead className="text-zinc-300">Price</TableHead>
                            <TableHead className="text-zinc-300">Qty.</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trades && trades.length > 0 ? (
                            trades.slice().reverse().map((trade, index) => (
                                <TableRow key = { index }>
                                    <TableCell className="font-mono text-xs text-zinc-300">
                                        { typeof trade.time === "object" ? 
                                            `${trade.time.year}-${String(trade.time.month).padStart(2, "0")}-${String(trade.time.day).padStart(2, "0")}` :
                                            trade.time
                                        }
                                    </TableCell>
                                    
                                    <TableCell className={`font-bold ${ trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                                        { trade.type.toUpperCase() }
                                    </TableCell>
                                    
                                    <TableCell className="font-mono text-zinc-100">
                                        { trade.price.toFixed(2) }
                                    </TableCell>

                                    <TableCell className="font-mono text-zinc-100">
                                        1
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={ 4 } className="text-center text-zinc-400 m-3">
                                    No trades yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}