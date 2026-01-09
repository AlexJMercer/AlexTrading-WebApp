<h1 align="center"> 📈 AlexTrading WebApp 📉 </h1>


## Description

> A simple mock web application for trading financial instruments, built with ReactJS, bundled with Vite.js, styled using Tailwind CSS and ShadCN UI components.
>
> This project does not, as of yet, provide any real trading functionalities or connect to any real trading platforms.


## Features Implemented

> - User Interface for Login (Mock)
> - Main dashboard with a ChartWindow, OrderBook, Wallet, and Performance Metric components
> - Responsive design using Tailwind CSS and ShadCN UI components
> - Data visualization using TradeView Lightweight Charts library
> - Data sending and receiving using WebSockets
> - Charting functionalities: Candlestick chart, Overlay markers using SeriesMarkers for both BUY and SELL orders
> - Trade History section to keep track of all executed trades at respective prices and timestamps
> - Wallet section keeps track of the user's balance and updates it based on executed trades (displays only the realized PnL)
> - 1 second tick rate for data updates





## Prerequisites

> - Node.js (v24.12 or higher)
> - npm (v11.6 or higher)
> 
> Install dependencies with **NPM**:
> ```bash
> git clone https://github.com/AlexJMercer/AlexTrading-WebApp.git
> cd AlexTrading-WebApp/AlexTrading
> npm install
> ```
>


## Running the Application

> To start the development server, run:
> ```bash
> npm run dev
> ```
> Open your browser and navigate to `http://localhost:5173` to view the application.
> To build the application for production, run:
> ```bash
> npm run build
> ```
> The production-ready files will be generated in the `dist` directory.
> To preview the production build locally, run:
> ```bash
> npm run preview
> ```
> This will start a local server to serve the files from the `dist` directory.



## How to use the Application

- Once you open `localhost` in your browser, you will be directed to a login screen. The mock email and password are provided at the bottom of the card element.

- Next, run the MockExchange server python script located in the Mock folder. This script simulates a trading exchange and send JSON data packets using websockets. It uses the `data.json` file located in the Data folder to send mock data one by one every second.

- Once you log in, considering that the MockExchange server is running, the candlesticks will be generated on the main chart window. Here, you can BUY or SELL the financial instrument and keep track of your orders in the Performance Metrics section.



## Unable to Implement / Known Issues

> - Toolbar at the top to change various functionalities of the chart, such as time frame, indicators, selection of symbols, etc.
>
> - As the Trade History section grows, the scrollbar appears and breaks the layout of the dashboard. Needs to be fixed.
> - The login functionality is mock and does not store any session data.
> - Due to not storing session data for the user, the wallet balance resets on every page refresh.
> - Websocket connection does not try to reconnect if connection drops, in case when the MockExchange server is stopped and restarted, the `trade` page needs to be refreshed.
> - Sharpe ratio isn't computing correctly, some bug in the logic which always results in 0.
> - While running the MockExchange server, once the end of `data.json` file is reached, the client side throws an error:<br>
`Unexpected Application Error!`<br>
`Assertion failed: data must be asc ordered by time, index=97, time=1514764800, prev time=1523318400`<br>
This is because the server stops sending data after reaching the end of the file, and the client side charting library expects data to be in ascending order by timestamp. The fix for this is to generate randomized signals in an always increasing timestamp, instead of reading from a static file. 

