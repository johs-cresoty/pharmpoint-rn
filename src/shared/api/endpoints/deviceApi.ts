import appSupportClient from '../appSupportClient';

// ─── 1. POST api/v1/pharmpoint/message (기기 등록) ───────────────────────────
interface RegisterDeviceBody {
  androidId: string;
  businessRegistrationNumber: string;
  currentVersionCode: number;
  fcmToken: string;
  ip: string;
  platform: string;
}

export function registerDevice(body: RegisterDeviceBody) {
  return appSupportClient.post<void>('api/v1/pharmpoint/message', body);
}

// ─── 2. POST api/v1/pharmpoint/version/check (버전 체크) ─────────────────────
interface VersionCheckBody {
  currentVersionCode: number;
  platform: string;
}

interface VersionCheckResponse {
  forceUpdate: boolean;
  installUrl: string;
  messageTitle?: string;
  message?: string;
}

export function checkVersion(body: VersionCheckBody) {
  return appSupportClient.post<VersionCheckResponse>('api/v1/pharmpoint/version/check', body);
}
