#
#  MockExchange.py
#
#  Description: This script will act a mock server to send out either randomly generated 
#               or pre-recorded JSON signals to the client-side trading application window.
#

import asyncio
import websockets

import os
import datetime as dt
import argparse
import json



class MockExchange:
    def __init__(self, filePath = None, pollInterval_ms = 1000, randomMode = False):
        self.filePath       = filePath
        self.pollInterval   = pollInterval_ms
        self.randomMode     = randomMode
        self.clients        = set()
        self.data           = None if randomMode else self.loadData()

    
    def loadData(self):
        if not os.path.exists(self.filePath):
            raise FileNotFoundError(f"File not found at : {self.filePath}")
        with open(self.filePath, 'r') as file:
            return json.load(file)
        
    # Don't use random for now
    def generateRandomPacket(self):
        return {
            "time": {
                "year": 2018,
                "month": 1,
                "day": 1
            },
            "open": 29.277412,
            "high": 33.278122,
            "low": 26.94392,
            "close": 28.46253
        }
        

    async def socketHandler(self, wsClient):
        self.clients.add(wsClient)
        try:
            await wsClient.wait_closed()
        finally:
            self.clients.remove(wsClient)


    async def broadcastMessage(self):
        if self.randomMode:
            while True:
                packet = self.generateRandomPacket()
                if self.clients:
                    message = json.dumps(packet)
                    await asyncio.gather(*(client.send(message) for client in self.clients))
                await asyncio.sleep(self.pollInterval / 1000)
        else:
            while True:
                for packet in self.data:
                    if self.clients:
                        message = json.dumps(packet)
                        await asyncio.gather(*(client.send(message) for client in self.clients))
                    await asyncio.sleep(self.pollInterval / 1000)


    async def startServer(self):
        async with websockets.serve(self.socketHandler, "localhost", 12345):
            print(f"MockExchange server started on ws://localhost:12345, interval={self.pollInterval}ms")
            await self.broadcastMessage()




def main():
    parser = argparse.ArgumentParser(description="MockExchange Server")
    
    parser.add_argument("--filePath", type = str, default = "../Data/data.json")
    parser.add_argument("--interval", type = int, default = 1000)
    parser.add_argument("--random", action = "store_true", default = False)
    args = parser.parse_args()

    exchangeObj = MockExchange(
        filePath = args.filePath, 
        pollInterval_ms = args.interval,
        randomMode = args.random
    )
    asyncio.run(exchangeObj.startServer())




if __name__ == "__main__":
    main()