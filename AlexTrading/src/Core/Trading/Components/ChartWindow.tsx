import { TradingChart } from "../Components/TradingChart";
import { Card, CardContent } from "@/Components/UI/card";


export default function ChartWindow({ liveData, trades } : { liveData:any, trades:any }) {
    return (
        <div className="flex-1 flex flex-col">
            <Card className="bg-zinc-900 border-zinc-800 flex-1 overflow-hidden shadow-2xl gap-0 py-0 relative rounded-none">
                <CardContent className="p-0 h-full">
                    <TradingChart 
                        data={ liveData } 
                        trades={ trades } 
                    />
                </CardContent>
            </Card>
        </div>
    );
}