import catposClient from '../catposClient';

// ─── 공통 쿼리 파라미터 ───────────────────────────────────────────────────────
interface BaseParams {
  TAXNO: string;
  CMPTR_NAME: string;
  POS_VER: string;
  POS_GUBN: string;
}

// ─── 응답 래퍼 ────────────────────────────────────────────────────────────────
interface ApiResponse<T> {
  MSG: string;
  CODE: string;
  DATA: T;
  DTL: unknown;
}

// ─── 1. GET api/point/settings ───────────────────────────────────────────────
interface PointSettingsData {
  INFO: Array<{ PNT_GUBN: string }>;
}

export function getPointSettings(params: BaseParams) {
  return catposClient.get<ApiResponse<PointSettingsData>>('api/point/settings', { params });
}

// ─── 2. GET api/point/payment-settings ──────────────────────────────────────
interface PaymentSettingsData {
  INFO: Array<{ BASE_AMT: number }>;
}

export function getPaymentSettings(params: BaseParams) {
  return catposClient.get<ApiResponse<PaymentSettingsData>>('api/point/payment-settings', {
    params,
  });
}

// ─── 3. GET /api/terminals/customers ────────────────────────────────────────
interface CustomerListParams {
  CMPTR_NAME: string;
  POS_VER: string;
  TAXNO: string;
  CST_HP: string;
}

interface CustomerListData {
  LIST: Array<{
    CST_CODE: string;
    CST_HP: string;
    CST_NAME: string;
    CST_GNDR: string;
    CST_BRTH: string;
    PNT_AMT: number;
  }>;
}

export function getCustomers(params: CustomerListParams) {
  return catposClient.get<ApiResponse<CustomerListData>>('api/terminals/customers', { params });
}

// ─── 4. GET api/terminals/customers/code ─────────────────────────────────────
interface CustomerCodeData {
  INFO: Array<{
    CST_GNDR: string;
    PNT_BLC: number;
    CST_BRTH: string;
    CST_NAME: string;
    CST_CODE: string;
    CST_HP: string;
  }>;
}

export function getCustomerByCode(params: BaseParams & { CST_HP: string }) {
  return catposClient.get<ApiResponse<CustomerCodeData>>('api/terminals/customers/code', {
    params,
  });
}

// ─── 5. POST api/point/estimate ──────────────────────────────────────────────
interface AddTransaction {
  TRN_GUBN: string;
  TRN_DATE: string;
  TRN_TIME: string;
  APP_NUM: string;
  TRN_AMT: number;
}

interface PointEstimateBody {
  TAXNO: string;
  CMPTR_NAME: string;
  POS_VER: string;
  TRN_DATE?: string;
  TRN_GUBN?: string;
  TRN_AMT?: number;
  APP_NUM?: string;
  ADD?: AddTransaction[];
}

interface PointEstimateData {
  INFO: Array<{
    SLE_SEQ: string;
    GRD_CODE: string;
    PNT_AMT: number;
    PAY_PNT_AMT: number;
    PNT_BLC: number;
    CST_CODE: string;
  }>;
}

export function postPointEstimate(body: PointEstimateBody) {
  return catposClient.post<ApiResponse<PointEstimateData>>('api/point/estimate', body);
}

// ─── 6. POST /api/terminals/customers/code ───────────────────────────────────
interface UsePointBody {
  TAXNO: string;
  CMPTR_NAME: string;
  POS_VER: string;
  CST_HP: string;
  TRN_DATE: string;
  SLE_SEQ?: string;
  TRN_GUBN?: string;
  TRN_TIME?: string;
  APP_NUM?: string;
  TRN_AMT?: number;
  ADD?: AddTransaction[];
}

interface UsePointData {
  INFO: Array<{
    SLE_SEQ: string;
    CST_CODE: string;
    CST_HP: string;
    CST_NAME: string;
    PNT_AMT: number;
    PNT_BLC: number;
  }>;
}

export function postUsePoint(body: UsePointBody) {
  return catposClient.post<ApiResponse<UsePointData>>('api/terminals/customers/code', body);
}
