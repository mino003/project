import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import PricingPage from './pages/PricingPage';
import AppStorePage from './pages/AppStorePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import useAuthStore from './stores/authStore';

const queryClient = new QueryClient();

function App() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/app-store" element={<AppStorePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;