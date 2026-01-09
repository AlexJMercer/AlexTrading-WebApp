import { useState, useMemo, useEffect } from "react";



export interface Trade {
    type:           'buy' | 'sell';
    price:          number;
    time:           string;
    closed?:        boolean;
    closedPrice?:   number;
    closedTime?:    string;
}



export const useTradingLogic = (currentPrice: number) => {
    const [trades, setTrades] = useState<Trade[]>([]);
    const [wallet, setWallet] = useState(10000);
    const [openBuys, setOpenBuys] = useState<Trade[]>([]);
    const [openSells, setOpenSells] = useState<Trade[]>([]);

    const executeTrade = (type: 'buy' | 'sell', price: number, time: string) => {
        // If active trade exists
        
        const newTrade = { type, price, time };

        if (type === 'buy') {

            // If there are open sells, close one
            if (openSells.length > 0) {
                const sellTrade = openSells[0];
                const profit = sellTrade.price - price;
                setWallet(prev => prev + profit);
                setOpenSells(prev => prev.slice(1));

            } else {
                setOpenBuys(prev => [...prev, newTrade]);
            }
        } else {

            // If there are open buys, close one
            if (openBuys.length > 0) {
                const buyTrade = openBuys[0];
                const profit = price - buyTrade.price;
                setWallet(prev => prev + profit);
                setOpenBuys(prev => prev.slice(1));
            } else {
                setOpenSells(prev => [...prev, newTrade]);
            }
        }

        setTrades(prev => [...prev, newTrade]);
    };


    // Calculate perf stats whenever trades update
    const statistics = useMemo(() => {

        let pnl = 0;
        let wins = 0;
        let closedCount = 0;

        // Use local arrays to simulate open positions
        const buys: Trade[] = [];
        const sells: Trade[] = [];

        trades.forEach(trade => {
            if (trade.type === 'buy') {
                if (sells.length > 0) {
                    // Close one sell
                    const sellTrade = sells.shift()!;
                    const profit = sellTrade.price - trade.price;
                    pnl += profit;
                    if (profit >= 0) wins++;
                    closedCount++;
                } else {
                    buys.push(trade);
                }
            } else {
                if (buys.length > 0) {
                    // Close one buy
                    const buyTrade = buys.shift()!;
                    const profit = trade.price - buyTrade.price;
                    pnl += profit;
                    if (profit >= 0) wins++;
                    closedCount++;
                } else {
                    sells.push(trade);
                }
            }
        });

        const winRate = closedCount > 0 ? (wins / closedCount) * 100 : 0;

        // Accumulate profits for closed trades
        const profits: number[] = [];
        const tempBuys: Trade[] = [];
        const tempSells: Trade[] = [];
        trades.forEach(trade => {
            if (trade.type === 'buy') {
                if (tempSells.length > 0) {
                    const sellTrade = tempSells.shift()!;
                    profits.push(sellTrade.price - trade.price);
                } else {
                    tempBuys.push(trade);
                }
            } else {
                if (tempBuys.length > 0) {
                    const buyTrade = tempBuys.shift()!;
                    profits.push(trade.price - buyTrade.price);
                } else {
                    tempSells.push(trade);
                }
            }
        });


        const mean = profits.length > 0 ? profits.reduce((a, b) => a + b, 0) / profits.length : 0;
        const stdDev = profits.length > 1
            ? Math.sqrt(profits.reduce((account, prof) => account + Math.pow(prof - mean, 2), 0) / (profits.length - 1))
            : 0;

        const sharpeRatio = stdDev !== 0 ? mean / stdDev : 0;

        

        return {
            pnl:            pnl,
            numTrades:      trades.length,
            winRate:        winRate,
            sharpeRatio:    sharpeRatio,
        };

    }, [trades]);


    const unrealizedPnl = 
            openBuys.reduce((account, trade) => account + (currentPrice - trade.price), 0) + 
            openSells.reduce((account, trade) => account + (trade.price - currentPrice), 0);


    return { 
        trades, 
        statistics, 
        wallet, 
        executeTrade,
        unrealizedPnl,
        openBuys,
        openSells
    };

};