import { useEffect, useRef } from "react";



export const EMAStrategy = ( openBuys, openSells, currPrice, currTime, executeTrade ) => {

    const priceBuffer = useRef<number[]>([]);
    const EMAPrev = useRef<number | null>(null);
    
    useEffect(() => {

        priceBuffer.current.push(currPrice);
        if (priceBuffer.current.length > 3) 
        {
            priceBuffer.current.shift();
        }
            
        if (priceBuffer.current.length < 3) return;

        if (EMAPrev.current === null) {
            EMAPrev.current = priceBuffer.current.reduce((a, b) => a + b, 0) / 3;
            return;
        }
    
        const multiplier = 0.5;
        const EMA = currPrice * multiplier + EMAPrev.current * (1 - multiplier); 
    
        if (openBuys.length > 0 && currPrice < EMA) {
            // sell order
            executeTrade('sell', currPrice, currTime);
        }
    
        if (openSells.length > 0 && currPrice > EMA) {
            // buy order
            executeTrade('buy', currPrice, currTime);
        }
        
        EMAPrev.current = EMA;

    }, [openBuys, openSells, currPrice, currTime, executeTrade]);
}