import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { User } from 'firebase/auth';
import Collections from './Collections';
import AuthForms from '../components/AuthForms';

const CollectionsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Knowledge Cards Collection
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please sign in to access your card collection and start collecting famous people from AP subjects!
            </p>
            <AuthForms />
          </div>
        </div>
      </div>
    );
  }

  // Use the user's UID as the userId for the collection system
  return <Collections userId={user.uid} />;
};

export default CollectionsPage;
