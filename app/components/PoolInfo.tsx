import { formatCompactNumber } from "../utils/math";

export const PoolInfo: React.FC<{ poolData: any }> = ({ poolData }) => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-sm text-gray-500">24h Volume</div>
        <div className="text-lg font-medium">${formatCompactNumber(poolData.dailyVolumeUSD)}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-sm text-gray-500">24h Fee USD</div>
        <div className="text-lg font-medium">${formatCompactNumber(poolData.dailyFeesUSD)}</div>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-sm text-gray-500">24h Tx Count</div>
        <div className="text-lg font-medium">{poolData.dailyTxCount}</div>
      </div>
      {/* <div className="bg-gray-50 p-4 rounded-xl">
        <div className="text-sm text-gray-500">Price</div>
        <div className="text-lg font-medium">1 ETH = {poolData.token0Price} USDC</div>
      </div> */}
    </div>
);