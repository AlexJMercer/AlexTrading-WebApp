import { useSocket } from "../Hooks/useSocket";
import { useTradingLogic } from "../Hooks/useTradingLogic";

import ChartWindow from "../Components/ChartWindow";
import WalletCard from "../Components/WalletCard";
import PerformanceCard from "../Components/PerformanceCard";
import OrderBookCard from "../Components/OrderbookCard";
import { ExecutionCard } from "../Components/ExecutionCard";
import { EMAStrategy } from "../Hooks/Backtest";


export default function TradePage() {
    const liveData = useSocket();
    
    const latestDataPoint = liveData.length > 0 ? liveData[liveData.length - 1] : null;
    const currentPrice = latestDataPoint?.close || 0;
    const currentTime = latestDataPoint?.time;

    
    const { trades, statistics, wallet, executeTrade, unrealizedPnl, openBuys, openSells } = useTradingLogic(currentPrice);
    
    
    // Execute EMA Strategy
    EMAStrategy(latestDataPoint, openBuys, openSells, currentPrice, currentTime, executeTrade);
    

    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-100 p-1 gap-1">
            
            {/* Main Content: Chart */}
            <ChartWindow
                liveData            = { liveData }
                trades              = { trades }
            />

            
            {/* Sidebar */}
            <div className="w-100 flex flex-col h-full overflow-y-auto">

                {/* Wallet Card */}
                <WalletCard
                    wallet          = { wallet }
                />

                {/* Performance Metrics Card */}
                <PerformanceCard
                    statistics      = { statistics }
                    unrealizedPnl   = { unrealizedPnl }
                />


                {/* Orderbook Card */}
                <OrderBookCard
                    trades          = { trades }
                />


                {/* Execution Button Card */}
                <ExecutionCard 
                    latestDataPoint = { latestDataPoint }
                    currentPrice    = { currentPrice }
                    currentTime     = { currentTime }
                    executeTrade    = { executeTrade }
                    // activeTrade     = { activeTrade }
                />

            </div>
        </div>
    );
}