import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface TokenInputProps {
  value: string;
  onValueChange: (value: string) => void;
  token: string;
  balance?: string;
}
  
export const TokenInput: React.FC<TokenInputProps> = ({ value, onValueChange, token, balance }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-gray-600">You {token === 'ETH' ? 'pay' : 'receive'}</span>
      {balance && <span className="text-sm text-gray-500">Balance: {balance}</span>}
    </div>
    <div className="flex items-center justify-between">
      <input
        type="number"
        className="bg-transparent text-2xl w-full outline-none"
        placeholder="0.0"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      />
      <button className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
        {token}
        <ChevronDownIcon className="w-4 h-4 ml-2" />
      </button>
    </div>
  </div>
);