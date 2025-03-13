import { create } from 'zustand';
import { TransferStore } from '../utils/types'

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  total: 0,
  loading: false,
  error: null,
  params: null,

  setTransfers: (transfers) => set({ transfers }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setParams: (params) => set({ params }),
}));