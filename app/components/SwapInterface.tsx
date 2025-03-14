import { SetStateAction, useEffect, useState } from 'react';
import { NETWORKS, TOKENS } from '../utils/constants';
import { usePoolInfo } from '../hooks/usePool';
import { ChainId } from '../utils/types';
import { TokenInput } from './TokenInput';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PoolInfo } from './PoolInfo';

export function SwapDialog() {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [activeField, setActiveField] = useState("input"); // Track active input
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0].label); // Network state
  const [chainId, setChainId] = useState<ChainId>(ChainId.Mainnet);
  const { loading, error, data } = usePoolInfo({
    token0: TOKENS[chainId as keyof typeof TOKENS].USDC_ADDRESS, 
    token1: TOKENS[chainId as keyof typeof TOKENS].WETH_ADDRESS, 
    chainId: chainId
  });
  // Handle input changes
  const handleInputChange = (value: string) => {
    setActiveField("input");
    setInputAmount(value);
  };

  const handleOutputChange = (value: string) => {
    setActiveField("output");
    setOutputAmount(value);
  };
  // Unified swap calculation effect
  useEffect(() => {
    if (!data?.pool) return;

    if (activeField === "input") {
      const rate = parseFloat(data.pool.token0Price);
      const outputValue = parseFloat(inputAmount) * rate;
      setOutputAmount(!inputAmount ? "0" : outputValue.toFixed(4));
    } else if (activeField === "output") {
      const rate = parseFloat(data.pool.token1Price);
      const inputValue = parseFloat(outputAmount) * rate;
      setInputAmount(!outputAmount ? "0" : inputValue.toFixed(4));
    }
  }, [inputAmount, outputAmount, data, activeField]);

  useEffect(() => {
    if (selectedNetwork == NETWORKS[0].value) {
      setChainId(ChainId.Mainnet);
    } else {
      setChainId(ChainId.Polygon);
    }
  }, [selectedNetwork]);

  if (loading) return <div className="text-center py-8">Loading pool data...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading data</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Swap</h2>
        <select
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
        >
          {NETWORKS.map((network) => (
            <option key={network.value} value={network.value}>
              {network.label}
            </option>
          ))}
        </select>
      </div>

      {data?.pool && <PoolInfo poolData={data} />}

      <TokenInput
        value={inputAmount}
        onValueChange={handleInputChange}//{setInputAmount}
        token="ETH"
        balance="0.0"
      />
      
      <div className="my-4 flex justify-center">
        <button className="p-2 bg-gray-100 rounded-full">
          <ChevronDownIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <TokenInput
        value={outputAmount}
        onValueChange={handleOutputChange}
        token="USDC"
      />

      <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors">
        Swap
      </button>
    </div>
  );
}
