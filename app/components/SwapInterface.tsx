import { useEffect, useState } from 'react';
import { USDC_ADDRESS, WETH_ADDRESS } from '../utils/constants';
import { usePoolInfo } from '../hooks/usePool';
import { ChainId } from '../utils/types';
import { TokenInput } from './TokenInput';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PoolInfo } from './PoolInfo';

export function SwapDialog() {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const { loading, error, data } = usePoolInfo({
    token0: USDC_ADDRESS, 
    token1: WETH_ADDRESS, 
    chainId: ChainId.Mainnet
  });
  
  // Simulate swap rate calculation
  useEffect(() => {
    if (data?.pool && inputAmount) {
      const rate = parseFloat(data.pool.token0Price);
      setOutputAmount((parseFloat(inputAmount) * rate).toFixed(4));
    }
  }, [inputAmount, data]);

  if (loading) return <div className="text-center py-8">Loading pool data...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading data</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Swap</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Cog6ToothIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {data?.pool && <PoolInfo poolData={data} />}

      <TokenInput
        value={inputAmount}
        onValueChange={setInputAmount}
        token="ETH"
        balance="0.5234"
      />
      
      <div className="my-4 flex justify-center">
        <button className="p-2 bg-gray-100 rounded-full">
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <TokenInput
        value={outputAmount}
        onValueChange={setOutputAmount}
        token="USDC"
      />

      <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors">
        Swap
      </button>
    </div>
  );
}
