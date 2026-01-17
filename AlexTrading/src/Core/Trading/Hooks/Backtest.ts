import { useState, useEffect, useMemo } from "react";
import { useTradingLogic } from "./useTradingLogic";

export const EMAStrategy = ( latestData, openBuys, openSells, currPrice, currTime, executeTrade ) => {

    const [slidingEMABuffer, setSlidingEMABuffer] = useState<any[]>([]);
    const [EMAList, setEMAList] = useState<any[]>([]);
    
    useEffect(() => {

        setSlidingEMABuffer((prev) => [...prev, latestData]);
        setEMAList((prev) => [...prev, () => {
            if (EMAList.length < 3) 
            {
                EMAList.push(latestData.price);
                return;
            }

            calculateEMA();
        }]);

        doBacktest();
    });


    const calculateEMA = () => {
        // const multiplier = 0.5;
        
        const EMA1 = EMAList[EMAList.length - 1];
        const EMA2 = EMAList[EMAList.length - 2];
        const EMA3 = EMAList[EMAList.length - 3];

        const currEMA = (3 * EMA1) - (3 * EMA2) + EMA3;

        console.log(currEMA);

        return currEMA;
    }



    const doBacktest = () => {
        if (openBuys.length > 0) {
            if (latestData.price < EMAList[EMAList.length - 1]) {
                // sell order
                executeTrade('sell', currPrice, currTime);
            }
        }
        
        if (openSells.length > 0) {
            if (latestData.price > EMAList[EMAList.length - 1]) {
                // buy order
                executeTrade('buy', currPrice, currTime);
            }
        }
            
    }
    
}