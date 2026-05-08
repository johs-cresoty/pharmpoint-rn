import axios from 'axios';

const BASE_URL_PROD = 'http://catpos.co.kr:13922/';
const BASE_URL_DEV = 'http://dev.catpos.co.kr/';

const BASE_URL = __DEV__ ? BASE_URL_DEV : BASE_URL_PROD;

const catposClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default catposClient;
