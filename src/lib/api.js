import axios from 'axios';
import { env } from './env';

const log = (...args) => console.log('[client:api]', ...args);

const api = axios.create({
  baseURL: env.apiBase,
  timeout: 45000,
});

api.interceptors.request.use((config) => {
  config.metadata = { start: Date.now() };
  log('→', config.method?.toUpperCase(), config.baseURL + config.url, {
    timeout: config.timeout,
  });
  return config;
});

api.interceptors.response.use(
  (response) => {
    const ms = Date.now() - (response.config.metadata?.start || Date.now());
    log('✓', response.status, response.config.url, `${ms}ms`);
    return response;
  },
  (error) => {
    const ms = Date.now() - (error.config?.metadata?.start || Date.now());
    log('✗', error.config?.url, `${ms}ms`, {
      code: error.code,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  },
);

/** Extract a user-facing message from an axios error */
export function getApiErrorMessage(err, fallback = 'Something went wrong') {
  if (err?.message && !err?.response) {
    return err.message;
  }
  if (!err?.response) {
    if (err?.code === 'ECONNABORTED') return 'Request timed out — try again';
    if (err?.code === 'ERR_NETWORK') return 'Network error — is the server running?';
    return fallback;
  }
  const data = err.response.data;
  if (typeof data?.message === 'string') return data.message;
  if (Array.isArray(data?.details) && data.details[0]?.message) {
    return data.details[0].message;
  }
  return fallback;
}

export const submitContact = (payload) => {
  log('submitContact', { type: payload.type, email: payload.email });
  return api.post('/contact', payload, { timeout: 45000 }).then((r) => r.data);
};

export default api;
