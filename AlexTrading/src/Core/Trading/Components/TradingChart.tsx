import { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries, type SeriesMarker, createSeriesMarkers } from 'lightweight-charts';
import type { Trade } from "../Hooks/useTradingLogic";


interface Properties {
    data: any[];
    trades: Trade[];
}


export const TradingChart = ({ data, trades }: Properties) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const seriesRef = useRef<any>(null);


    useEffect(() => {

        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: { background: { type: ColorType.Solid, color: '#222222' }, textColor: '#a1a1a1' },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            grid: { vertLines: { color: '#272727' }, horzLines: { color: '#272727' } },
        });

        const candleStickSeries = chart.addSeries(CandlestickSeries, {
            upColor:        '#29e96f',
            downColor:      '#e72e2f',
            borderVisible:  false,
            wickUpColor:    '#29e96f',
            wickDownColor:  '#e72e2f',
        });

        seriesRef.current = candleStickSeries;
        candleStickSeries.setData(data);


        const seriesMarkers: SeriesMarker<any>[] = trades.map((t) => ({
            time:       t.time,
            position:   t.type === 'buy' ? 'belowBar' : 'aboveBar',
            color:      t.type === 'buy' ? '#29e96f' : '#e72e2f',
            shape:      t.type === 'buy' ? 'arrowUp' : 'arrowDown',
            text:       t.type.toUpperCase() + " @ " + t.price.toFixed(2).toString(),
        }));

        createSeriesMarkers(candleStickSeries, seriesMarkers);

        chart.timeScale().fitContent();

        return () => chart.remove();

    }, [data, trades]);

    return <div ref={chartContainerRef} className="w-full h-screen" />
};