import { useState, useEffect, useRef } from "react";
import mockData from '../../../../../Data/data.json';



export const useSocket = () => {
    // ======= Use static JSON file ========

    // const [data, setData] = useState<any[]>([]);
    // const [currIndex, setCurrIndex] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (currIndex < mockData.length) {
    //             setData((prev) => [...prev, mockData[currIndex]]);
    //             setCurrIndex((prev) => prev + 1);
    //         }
    //     }, 1000);
    // 
    //     return () => clearInterval(interval);
    // }, [currIndex]);
    //
    // return data;
    //
    
    
    
    // ======= Use Websocket ========

    const [data, setData]   = useState<any[]>([]);
    const wsRef             = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socketConn    = new WebSocket("ws://localhost:12345");
        wsRef.current       = socketConn;

        socketConn.onmessage = (messageEvent) => {
            try {
                const packet = JSON.parse(messageEvent.data);
                setData((prev) => [...prev, packet]);
            } catch (exception) {
                console.log(exception);
            }
        };

        socketConn.onerror = (error) => {
            console.log(error);
        };

        return () => {
            socketConn.close();
        };
    }, []);

    return data;
};