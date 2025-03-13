import { useEffect, useCallback } from 'react';
import { useTransferStore } from './useTransferStore'
import { TransferParams, Transfer } from '../utils/types'
import { searchTransfers } from '../lib/axelar'
import { TX_LIMIT_SIZE } from '../utils/constants';

interface ApiResponse {
  data: Transfer[];
  total: number;
  error?: string;
}

export const useTransfers = () => {
  const { setTransfers, setTotal, setLoading, setError, params } = useTransferStore();

  const fetchTransfers = useCallback(async (params: TransferParams) => {
    try {
      setLoading(true);
      const response: ApiResponse = await searchTransfers({...params, size: TX_LIMIT_SIZE});
      if (response.error) {
        throw new Error(response.error);
      }
      setTransfers(response.data);
      setTotal(response.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transfers');
    } finally {
      setLoading(false);
    }
  }, [setTransfers, setLoading, setError]);

  useEffect(() => {
    if (params) {
      fetchTransfers(params);
    }
  }, [params, fetchTransfers]);

  return { fetchTransfers };
};