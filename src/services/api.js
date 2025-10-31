import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.patch(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Eleves API
export const eleveAPI = {
  getAll: () => api.get('/eleves'),
  getById: (id) => api.get(`/eleves/${id}`),
  create: (data) => api.post('/eleves', data),
  update: (id, data) => api.patch(`/eleves/${id}`, data),
  delete: (id) => api.delete(`/eleves/${id}`),
};

// Classes API
export const classeAPI = {
  getAll: () => api.get('/classes'),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post('/classes', data),
  update: (id, data) => api.patch(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

// Cours API
export const coursAPI = {
  getAll: () => api.get('/cours'),
  getById: (id) => api.get(`/cours/${id}`),
  create: (data) => api.post('/cours', data),
  update: (id, data) => api.patch(`/cours/${id}`, data),
  delete: (id) => api.delete(`/cours/${id}`),
};

// Notes API
export const noteAPI = {
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.patch(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
};

// Paiements API
export const paiementAPI = {
  getAll: () => api.get('/paiements'),
  getById: (id) => api.get(`/paiements/${id}`),
  create: (data) => api.post('/paiements', data),
  update: (id, data) => api.patch(`/paiements/${id}`, data),
  delete: (id) => api.delete(`/paiements/${id}`),
};

// Communications API
export const communicationAPI = {
  getAll: () => api.get('/communications'),
  getById: (id) => api.get(`/communications/${id}`),
  create: (data) => api.post('/communications', data),
  update: (id, data) => api.patch(`/communications/${id}`, data),
  delete: (id) => api.delete(`/communications/${id}`),
};

// Roles API
export const roleAPI = {
  getAll: () => api.get('/roles'),
  getById: (id) => api.get(`/roles/${id}`),
  create: (data) => api.post('/roles', data),
  update: (id, data) => api.patch(`/roles/${id}`, data),
  delete: (id) => api.delete(`/roles/${id}`),
};

// Bulletins API
export const bulletinAPI = {
  getAll: () => api.get('/bulletins'),
  getById: (id) => api.get(`/bulletins/${id}`),
  create: (data) => api.post('/bulletins', data),
  update: (id, data) => api.patch(`/bulletins/${id}`, data),
  delete: (id) => api.delete(`/bulletins/${id}`),
};

// Parent Eleve API
export const parentEleveAPI = {
  getAll: () => api.get('/parent-eleves'),
  getById: (id) => api.get(`/parent-eleves/${id}`),
  create: (data) => api.post('/parent-eleves', data),
  update: (id, data) => api.patch(`/parent-eleves/${id}`, data),
  delete: (id) => api.delete(`/parent-eleves/${id}`),
};

// Detail Bulletins API
export const detailBulletinAPI = {
  getAll: () => api.get('/detail-bulletins'),
  getById: (id) => api.get(`/detail-bulletins/${id}`),
  create: (data) => api.post('/detail-bulletins', data),
  update: (id, data) => api.patch(`/detail-bulletins/${id}`, data),
  delete: (id) => api.delete(`/detail-bulletins/${id}`),
};

// Adresse Eleve API
export const adresseEleveAPI = {
  getAll: () => api.get('/adresse-eleves'),
  getById: (id) => api.get(`/adresse-eleves/${id}`),
  create: (data) => api.post('/adresse-eleves', data),
  update: (id, data) => api.patch(`/adresse-eleves/${id}`, data),
  delete: (id) => api.delete(`/adresse-eleves/${id}`),
};

export default api;
