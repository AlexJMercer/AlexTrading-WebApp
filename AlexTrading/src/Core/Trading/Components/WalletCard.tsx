import { Card, CardContent, CardHeader, CardTitle } from "@/Components/UI/card";
import { Wallet } from "lucide-react";


export default function WalletCard({ wallet }) {
    return (
        <Card className="bg-zinc-900 border-x border-t border-zinc-800 shadow-xl rounded-none">
            <CardHeader className="flex items-center pb-2 space-y-0">
                <CardTitle className="text-lg font-large flex items-center gap-4 text-white">
                    <Wallet className="w-7 h-7 text-cyan-400" />
                    Wallet Balance
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-cyan-300">
                    ${wallet.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
            </CardContent>
        </Card>
    );
}