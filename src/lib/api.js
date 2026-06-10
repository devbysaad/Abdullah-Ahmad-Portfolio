import axios from 'axios';
import { env } from './env';

const api = axios.create({
  baseURL: env.apiBase,
  timeout: 15000,
});

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

export const submitContact = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

export default api;
