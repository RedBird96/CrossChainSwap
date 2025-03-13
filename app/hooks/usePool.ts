import { useMemo } from "react";
import { PoolInfoParams, PoolInfoResult, PoolQueryResponse } from "../utils/types";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { ETH_USDC_POOL_QUERY } from "../lib/graphql/uniswapQueries";
import { UNISWAP_V3_SUBGRAPH_MAINNET } from "../utils/constants";

export function usePoolInfo({
    token0,
    token1,
    chainId
}:PoolInfoParams): PoolInfoResult {

    // Calculate 24h ago timestamp (current time - 24h in seconds)
    const startTime = useMemo(() => Math.floor(Date.now() / 1000) - 86400, []);

    // Dynamic client selection based on chainId
    const client = useMemo(() => new ApolloClient({
        uri: UNISWAP_V3_SUBGRAPH_MAINNET,
        cache: new InMemoryCache(),
    }), [chainId]);

    const { loading, error, data } = useQuery<PoolQueryResponse>(ETH_USDC_POOL_QUERY, {
        client,
        variables: {
            token0: token0?.toLowerCase(),
            token1: token1?.toLowerCase(),
            start_time: startTime,
        },
        skip: !token0 || !token1, // Skip query if tokens are undefined
        fetchPolicy: 'cache-and-network', // Optimize for fast UI
    });
    // Process data only when needed
    const processedData = useMemo(() => {
        if (!data?.pools?.length) return undefined;

        const pool = data.pools[0];

        // Calculate 24h volume from hourly data
        // Single pass reduce for all metrics
        const { totalVolume, totalFees, totalTxs } = pool.poolHourData.reduce(
            (acc, hour) => ({
                totalVolume: acc.totalVolume + Number(hour.volumeUSD),
                totalFees: acc.totalFees + Number(hour.feesUSD),
                totalTxs: acc.totalTxs + parseInt(hour.txCount, 10),
            }), 
            { totalVolume: 0, totalFees: 0, totalTxs: 0 }
        );

        return {
            pool,
            dailyVolumeUSD: totalVolume,
            dailyFeesUSD: totalFees,
            dailyTxCount: totalTxs,
            hourlyData: pool.poolHourData,
        };
    }, [data]);

    return {
        loading,
        error,
        data: processedData,
    };
}