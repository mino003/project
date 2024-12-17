import api from './api';

export const authService = {
  async login(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    localStorage.setItem('token', data.token);
    return data;
  },

  async register(userData) {
    const { data } = await api.post('/auth/register', userData);
    localStorage.setItem('token', data.token);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};