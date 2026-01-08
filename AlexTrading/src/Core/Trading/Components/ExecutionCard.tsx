import { Button } from "@/Components/UI/button";


export function ExecutionCard({ latestDataPoint, currentPrice, currentTime, executeTrade }) {
    return (
        <div className="flex flex-col">
            <div className="flex gap-4 bg-zinc-900 border-x border-t border-zinc-800 shadow-lg rounded-none justify-center items-center h-20">
                <Button
                    size        =   "sm"
                    className   =   "bg-green-600 hover:bg-green-500 w-40 h-14 text-lg font-black shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                    disabled    =   { !latestDataPoint }
                    onClick     =   { () => executeTrade('buy', currentPrice, currentTime) }
                >
                    BUY / LONG
                </Button>
                
                <Button
                    size        =   "sm"
                    variant     =   "destructive"
                    className   =   "w-40 h-14 text-lg font-black shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    disabled    =   { !latestDataPoint }
                    onClick     =   { () => executeTrade('sell', currentPrice, currentTime) }
                >
                    SELL / SHORT
                </Button>
            </div>
        </div>
    );
}