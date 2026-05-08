import { create } from 'zustand';

// 고객 정보 (GET /api/terminals/customers 응답)
export interface CustomerInfo {
  CST_CODE: string;
  CST_HP: string;
  CST_NAME: string;
  CST_GNDR: string;
  CST_BRTH: string;
  PNT_AMT: number;
}

// 고객 코드 상세 (GET /api/terminals/customers/code 응답)
export interface CustomerCodeInfo {
  CST_GNDR: string;
  PNT_BLC: number;
  CST_BRTH: string;
  CST_NAME: string;
  CST_CODE: string;
  CST_HP: string;
}

// 포인트 적립/차감 견적 (POST /api/point/estimate 응답)
export interface PointEstimateInfo {
  SLE_SEQ: string;
  GRD_CODE: string;
  PNT_AMT: number;
  PAY_PNT_AMT: number;
  PNT_BLC: number;
  CST_CODE: string;
}

// 포인트 사용 결과 (POST /api/terminals/customers/code 응답)
export interface UsePointResultInfo {
  SLE_SEQ: string;
  CST_CODE: string;
  CST_HP: string;
  CST_NAME: string;
  PNT_AMT: number;
  PNT_BLC: number;
}

interface NavigationState {
  customerInfo: CustomerInfo | null;
  customerCodeInfo: CustomerCodeInfo | null;
  pointEstimateInfo: PointEstimateInfo | null;
  usePointResultInfo: UsePointResultInfo | null;

  setCustomerInfo: (info: CustomerInfo | null) => void;
  setCustomerCodeInfo: (info: CustomerCodeInfo | null) => void;
  setPointEstimateInfo: (info: PointEstimateInfo | null) => void;
  setUsePointResultInfo: (info: UsePointResultInfo | null) => void;
  clearAll: () => void;
}

export const useNavigationStore = create<NavigationState>(set => ({
  customerInfo: null,
  customerCodeInfo: null,
  pointEstimateInfo: null,
  usePointResultInfo: null,

  setCustomerInfo: info => set({ customerInfo: info }),
  setCustomerCodeInfo: info => set({ customerCodeInfo: info }),
  setPointEstimateInfo: info => set({ pointEstimateInfo: info }),
  setUsePointResultInfo: info => set({ usePointResultInfo: info }),
  clearAll: () =>
    set({
      customerInfo: null,
      customerCodeInfo: null,
      pointEstimateInfo: null,
      usePointResultInfo: null,
    }),
}));
