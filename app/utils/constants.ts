import { ChainId } from "./types";

export const UNISWAP_V3_SUBGRAPH_MAINNET = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
export const UNISWAP_V3_SUBGRAPH_POLYGON = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_API_KEY}/subgraphs/id/3hCPRGf4z88VC5rsBKU5AA9FBBq5nF3jbKJG7VZCbhjm`;
export const UNISWAP_V3_SUBGRAPH_ROPSTEN = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;

export const TOKENS = {
    [ChainId.Mainnet]: {
        USDC_ADDRESS:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        WETH_ADDRESS:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    },
    [ChainId.Polygon]:{
        USDC_ADDRESS:"0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        WETH_ADDRESS:"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
    }
}

// Network options
export const NETWORKS = [
    { value: "ethereum", label: "Ethereum" },
    { value: "polygon", label: "Polygon" },
];

export const UNISWAP_SUBGRAPH_URLS = {
    [ChainId.Mainnet]: UNISWAP_V3_SUBGRAPH_MAINNET,
    [ChainId.Testnet]: UNISWAP_V3_SUBGRAPH_ROPSTEN,
    [ChainId.Polygon]: UNISWAP_V3_SUBGRAPH_POLYGON
    // Add other chain IDs as needed
};

export const TX_LIMIT_SIZE = 100;