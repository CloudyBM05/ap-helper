import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  const getAuthHeaders = (): Record<string, string> => {
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };

  return {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    getAuthHeaders
  };
};
