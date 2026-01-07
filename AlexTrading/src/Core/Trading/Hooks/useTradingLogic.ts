import { useState, useMemo } from "react";



export interface Trade {
    type: 'buy' | 'sell';
    price: number;
    time: string;
}



export const useTradingLogic = () => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [wallet, setWallet] = useState(10000);


    const statistics = useMemo(() => {

        const totalTrades = trades.length;
        const wins = trades.filter((t, i) => {
            if (i === 0)
                return false;

            return t.type === 'buy' ?
                    t.price < trades[i - 1].price :
                    t.price > trades[i - 1].price;
        }).length;

        return {
            pnl:            trades.reduce((acc, t) => acc + (t.type === 'buy' ? -t.price : t.price), 0),
            numTrades:      totalTrades,
            winRate:        (totalTrades > 0) ? (wins / totalTrades) * 100 : 0,
            sharpeRatio:    1.8,
        };

    }, [trades]);

    const executeTrade = (type: 'buy' | 'sell', price: number, time: string) => {
        setTrades(prev => [...prev, { type, price, time }]);
    };

    return { trades, statistics, wallet, executeTrade };
};