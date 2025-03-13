import {ChainId as UniswapChainId} from '@uniswap/sdk-core'

export enum ChainId {
    Mainnet = UniswapChainId.MAINNET,
    Polygon = UniswapChainId.POLYGON,
    Testnet = UniswapChainId.MONAD_TESTNET
}

export interface PoolHourData {
    periodStartUnix: number;
    volumeUSD: string;
    txCount: string;
    feesUSD: string;
}
  
export interface PoolData {
    id: string;
    token0Price: string;
    token1Price: string;
    volumeUSD: string;
    poolHourData: PoolHourData[];
}
  
// The full response type for your query
export interface PoolQueryResponse {
    pools: PoolData[];
}

export interface PoolInfoResult {
    loading: boolean;
    error?: Error;
    data?: {
      pool: PoolData | null;
      dailyVolumeUSD: number;
      dailyFeesUSD: number;
      dailyTxCount: number;
      hourlyData: PoolHourData[];
    };
}

export interface PoolInfoParams {
    token0: string;
    token1: string;
    chainId: ChainId;
}

export interface BlockInfo {
    avg_block_time: number;
    catching_up: boolean;
    earliest_app_hash: string;
    earliest_block_hash: string;
    earliest_block_height: string;
    earliest_block_time: string;
    latest_app_hash: string;
    latest_block_hash: string;
    latest_block_height: number;
    latest_block_time: string;
    time_spent: number;
}

interface Created_At {
    day: number;
    hour: number;
    month: number;
    ms: number;
    quarter: number;
    week: number;
    year: number;
}

export interface SendData {
    amount: string;
    destination_chain: string;
    source_chain: string;
    txhash: string;
    created_at: Created_At;
    status: string;
    sender_address: string;
    recipient_address: string;
}

export interface Transfer {
    type:string;
    send?: SendData;
}

export interface ExtractedTransfer {
    type: string;
    amount: string;
    destination_chain: string;
    source_chain: string;
    txhash: string;
    created_at: Created_At;
    status: string;
    sender_address: string;
    recipient_address: string;
}

export interface TransferStore {
    transfers: Transfer[];
    total: number;
    loading: boolean;
    error: string | null;
    params: TransferParams | null;
    setTransfers: (transfers: Transfer[]) => void;
    setTotal: (total: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setParams: (params: TransferParams) => void;
}

export interface TransferParams {
    address?: string;
    from?: number;
    size: number;
    sortBy?: 'value' | 'date';
}