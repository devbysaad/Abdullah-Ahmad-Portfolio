import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 30000,
});

/** Extract a user-facing message from an axios error */
export function getApiErrorMessage(err, fallback = 'Something went wrong') {
  if (!err?.response) {
    return err?.code === 'ECONNABORTED' ? 'Request timed out — try again' : fallback;
  }
  const data = err.response.data;
  if (typeof data?.message === 'string') return data.message;
  if (Array.isArray(data?.details) && data.details[0]?.message) {
    return data.details[0].message;
  }
  return fallback;
}

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

async function fetchJson(url) {
  const { data } = await api.get(url);
  return data;
}

export const fetchProjects = () => fetchJson('/projects');
export const fetchServices = () => fetchJson('/services');
export const fetchTestimonials = () => fetchJson('/testimonials');
export const fetchAbout = () => fetchJson('/about');
export const fetchExperience = () => fetchJson('/experience');

export const submitContact = (payload) =>
  api.post('/contact', payload).then((r) => r.data);

export const login = (password) => api.post('/auth/login', { password });
export const logout = () => api.post('/auth/logout');
export const checkAuth = () => api.get('/auth/me').then((r) => r.data);

export const adminApi = {
  projects: {
    list: () => fetchJson('/admin/projects'),
    create: (data) => api.post('/admin/projects', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/projects/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/projects/${id}`),
  },
  testimonials: {
    list: () => fetchJson('/admin/testimonials'),
    create: (data) => api.post('/admin/testimonials', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/testimonials/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/testimonials/${id}`),
  },
  services: {
    list: () => fetchJson('/admin/services'),
    create: (data) => api.post('/admin/services', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/services/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/services/${id}`),
  },
  experience: {
    list: () => fetchJson('/admin/experience'),
    create: (data) => api.post('/admin/experience', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/experience/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/experience/${id}`),
  },
  about: {
    get: () => fetchJson('/admin/about'),
    update: (data) => api.put('/admin/about', data).then((r) => r.data),
  },
  upload: {
    image: (file, folder = 'profile') => {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', folder);
      return api
        .post('/admin/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((r) => r.data);
    },
  },
};

export default api;
