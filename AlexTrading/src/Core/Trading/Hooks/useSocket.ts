import { useState, useEffect } from "react";
import mockData from '../../../../../Data/data.json';



export const useSocket = () => {
    const [data, setData] = useState<any[]>([]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currIndex < mockData.length) {
                setData((prev) => [...prev, mockData[currIndex]]);
                setCurrIndex((prev) => prev + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [currIndex]);

    return data;
};