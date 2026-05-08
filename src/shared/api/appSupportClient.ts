import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@shared/store/authStore';
import appSupportAuthClient from './appSupportAuthClient';

const BASE_URL_PROD = 'http://catpos.co.kr:13922/';
const BASE_URL_DEV = 'http://dev.catpos.co.kr/';

const BASE_URL = __DEV__ ? BASE_URL_DEV : BASE_URL_PROD;

const appSupportClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 요청 인터셉터: Bearer 토큰 자동 주입
appSupportClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);

// 401 시 토큰 갱신 후 재시도
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

appSupportClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise<string>(resolve => {
        refreshQueue.push(resolve);
      }).then(newToken => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return appSupportClient(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const { refreshToken, setToken, clearToken } = useAuthStore.getState();
      if (!refreshToken) {
        clearToken();
        return Promise.reject(error);
      }

      const { data } = await appSupportAuthClient.post<{
        token: string;
        refreshToken: string;
      }>('api/v1/pharmpoint/auth/refresh', { refreshToken });

      setToken(data.token, data.refreshToken);

      refreshQueue.forEach(resolve => resolve(data.token));
      refreshQueue = [];

      originalRequest.headers.Authorization = `Bearer ${data.token}`;
      return appSupportClient(originalRequest);
    } catch {
      useAuthStore.getState().clearToken();
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

export default appSupportClient;
