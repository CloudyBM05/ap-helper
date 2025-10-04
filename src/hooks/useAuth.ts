import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          // Get the Firebase ID token
          const idToken = await user.getIdToken();
          setToken(idToken);
          localStorage.setItem('auth_token', idToken);
        } catch (error) {
          console.error('Error getting ID token:', error);
          setToken(null);
        }
      } else {
        setToken(null);
        localStorage.removeItem('auth_token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    setToken(idToken);
    localStorage.setItem('auth_token', idToken);
    return userCredential.user;
  };

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    setToken(idToken);
    localStorage.setItem('auth_token', idToken);
    return userCredential.user;
  };

  const logout = async () => {
    await auth.signOut();
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  const getAuthHeaders = (): Record<string, string> => {
    const storedToken = token || localStorage.getItem('auth_token');
    if (storedToken) {
      return { Authorization: `Bearer ${storedToken}` };
    }
    return {};
  };

  const isAuthenticated = !!user;

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    getAuthHeaders
  };
};
