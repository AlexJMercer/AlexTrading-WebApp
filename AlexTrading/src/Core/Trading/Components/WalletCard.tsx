import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { Wallet } from "lucide-react";


export default function WalletCard({ wallet }) {
    return (
        <Card className="bg-zinc-900 border-x border-t border-zinc-800 shadow-xl rounded-none">
            <CardHeader className="flex items-center pb-2 space-y-0">
                <CardTitle className="text-xl font-large flex items-center gap-4 text-white">
                    <Wallet className="w-7 h-7 text-cyan-400" />
                    Wallet
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex text-lg font-bold justify-between text-cyan-300">
                    <div className="text-lg font-bold text-white">
                        Current Balance:
                    </div>
                    ${wallet.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
            </CardContent>
        </Card>
    );
}