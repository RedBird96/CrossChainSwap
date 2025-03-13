import { ChainId } from "./types";

export const UNISWAP_V3_SUBGRAPH_MAINNET = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
const UNISWAP_V3_SUBGRAPH_ROPSTEN = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_API_KEY}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
export const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

export const UNISWAP_SUBGRAPH_URLS = {
    [ChainId.Mainnet]: UNISWAP_V3_SUBGRAPH_MAINNET,
    [ChainId.Testnet]: UNISWAP_V3_SUBGRAPH_ROPSTEN,
    // Add other chain IDs as needed
};

export const TX_LIMIT_SIZE = 100;