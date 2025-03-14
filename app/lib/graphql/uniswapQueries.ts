import { gql } from '@apollo/client';

export const ETH_USDC_POOL_QUERY = gql`
  query EthUsdcPool($token0: String!, $token1: String!, $start_time: Int!) {
    pools(
      where: {
        token0: $token0,
        token1: $token1
      },
      first: 1, 
      orderBy:liquidity, 
      orderDirection: desc
    ) {
      id
      token0Price
      token1Price
      volumeUSD
      poolHourData(
        where: { periodStartUnix_gt: $start_time}
        orderBy: periodStartUnix
        orderDirection: desc
      ) {
        periodStartUnix
        volumeUSD
        txCount
        feesUSD
      }
    }
  }
`;