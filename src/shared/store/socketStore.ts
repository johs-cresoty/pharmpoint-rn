import { create } from 'zustand';

// Phase 4에서 WebSocket 관련 상태 채울 예정
interface SocketState {}

export const useSocketStore = create<SocketState>(() => ({}));
