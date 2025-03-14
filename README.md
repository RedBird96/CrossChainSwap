# Cross-Chain Swap Demo

## Summary

This is a cross-chain swap demo project that shows swap UI and accelerator bridge information.

At swap dialog, you can see ETH/USDC pool info such as 24-hour Volume, 24-hour Fee, 24-hour Tx Count which is obtained by Subgraph.

It supports 2 networks (Ethereum/Polygon) and you can select one of them.

At Axelar Bridge, you can see the live transfer transactions and bridge fee data which is obtained by Axelar Scan API.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Link

It's deployed on vercel at this linke

https://cross-chain-swap-snowy.vercel.app/