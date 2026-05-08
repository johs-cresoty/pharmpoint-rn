import axios from 'axios';

const BASE_URL_PROD = 'http://catpos.co.kr:13922/';
const BASE_URL_DEV = 'http://dev.catpos.co.kr/';

const BASE_URL = __DEV__ ? BASE_URL_DEV : BASE_URL_PROD;

// 인증 헤더 없음 — 로그인, 토큰 갱신, 약국 검증 전용
const appSupportAuthClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default appSupportAuthClient;
