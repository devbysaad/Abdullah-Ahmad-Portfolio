import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const fetchProjects = () => api.get('/projects').then((r) => r.data);
export const fetchServices = () => api.get('/services').then((r) => r.data);
export const fetchTestimonials = () => api.get('/testimonials').then((r) => r.data);
export const fetchAbout = () => api.get('/about').then((r) => r.data);
export const fetchExperience = () => api.get('/experience').then((r) => r.data);
export const submitContact = (data) => api.post('/contact', data);

export const login = (password) => api.post('/auth/login', { password });
export const logout = () => api.post('/auth/logout');
export const checkAuth = () => api.get('/auth/me');

export const adminApi = {
  projects: {
    list: () => api.get('/admin/projects').then((r) => r.data),
    create: (data) => api.post('/admin/projects', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/projects/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/projects/${id}`),
  },
  testimonials: {
    list: () => api.get('/admin/testimonials').then((r) => r.data),
    create: (data) => api.post('/admin/testimonials', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/testimonials/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/testimonials/${id}`),
  },
  services: {
    list: () => api.get('/admin/services').then((r) => r.data),
    create: (data) => api.post('/admin/services', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/services/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/services/${id}`),
  },
  experience: {
    list: () => api.get('/admin/experience').then((r) => r.data),
    create: (data) => api.post('/admin/experience', data).then((r) => r.data),
    update: (id, data) => api.put(`/admin/experience/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/admin/experience/${id}`),
  },
  about: {
    get: () => api.get('/admin/about').then((r) => r.data),
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
