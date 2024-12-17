import create from 'zustand';
import { authService } from '../services/auth.service';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (credentials) => {
    try {
      const data = await authService.login(credentials);
      set({ user: data.user, isAuthenticated: true });
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const data = await authService.register(userData);
      set({ user: data.user, isAuthenticated: true });
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));

export default useAuthStore;