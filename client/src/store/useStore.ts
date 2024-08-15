import { create } from 'zustand';

interface StoreState {
  bears: number;
  increase: () => void;
}

export const useStore = create<StoreState>(set => ({
  bears: 0,
  increase: () => set(state => ({ bears: state.bears + 1 }))
}));
