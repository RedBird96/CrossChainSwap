import { AxelarQueryAPI, Environment } from '@axelar-network/axelarjs-sdk';

const request = async (method:string, params:any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_VALIDATOR_API_URL}/${method}`, { method: 'POST', body: JSON.stringify(params) }).catch(error => { return null })
  return response && await response.json()
}

export const fetchBridgeFee = async (sourceChain: string, destChain: string, token: string) => {

  const sdk = new AxelarQueryAPI({
      environment: Environment.MAINNET
  });
  
  const res = await sdk.estimateGasFee(sourceChain, destChain, 1000000, "auto", token);
  return res;
};

export const getRPCStatus = async (params: any) => await request('rpc', { ...params, path: '/status' });
export const searchTransfers = async (params: any) => await request('searchTransfers', params);