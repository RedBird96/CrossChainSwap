"use client";

import BridgeInterface from "./components/BridgeInterface";
import { SwapDialog } from "./components/SwapInterface";

export default function Home() {
  return (
  <main className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8 text-center">Cross-Chain Swap Demo</h1>
    <div className="flex justify-center gap-8">
      <div className="w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Swap Dialog</h2>
        <SwapDialog />
      </div>
      <div className="w-2/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-center">Axelar Bridge</h2>
        <BridgeInterface />
      </div>
    </div>
  </main>
  );
}
