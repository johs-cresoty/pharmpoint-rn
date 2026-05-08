import appSupportAuthClient from '../appSupportAuthClient';

// ─── 1. POST api/v1/pharmpoint/auth/token (로그인) ───────────────────────────
interface LoginBody {
  id: string;
  password: string;
}

interface TokenResponse {
  token: string;
  refreshToken: string;
}

export function login(body: LoginBody) {
  return appSupportAuthClient.post<TokenResponse>('api/v1/pharmpoint/auth/token', body);
}

// ─── 2. POST api/v1/pharmpoint/auth/refresh (토큰 갱신) ─────────────────────
export function refreshToken(refreshToken: string) {
  return appSupportAuthClient.post<TokenResponse>('api/v1/pharmpoint/auth/refresh', {
    refreshToken,
  });
}

// ─── 3. POST api/v1/pharmpoint/auth/logout (로그아웃) ───────────────────────
export function logout(refreshToken: string) {
  return appSupportAuthClient.post<void>('api/v1/pharmpoint/auth/logout', { refreshToken });
}

// ─── 4. GET api/v1/pharmpoint/auth/validate-pharmacy (약국 검증) ─────────────
interface ValidatePharmacyResponse {
  message: string;
  valid: boolean;
}

export function validatePharmacy(businessRegistrationNumber: string) {
  return appSupportAuthClient.get<ValidatePharmacyResponse>(
    'api/v1/pharmpoint/auth/validate-pharmacy',
    { params: { businessRegistrationNumber } },
  );
}
