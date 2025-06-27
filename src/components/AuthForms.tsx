import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User,
  updateProfile
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

interface AuthFormsProps {
  forceProfileEdit?: boolean;
  onClose?: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ forceProfileEdit = false, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showProfileSetup, setShowProfileSetup] = useState(forceProfileEdit);
  const [profileUsername, setProfileUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState('');
  const iconOptions = [
    '🦅', '📚', '🎓', '🏆', '🌟', '🧠', '⚡', '🔥', '🚀', '🎯', '💡', '📝', '🏛️', '🇺🇸', '👩‍🎓', '👨‍🎓'
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // Always show profile setup if forceProfileEdit is true
      if (user && (forceProfileEdit || !user.displayName || !user.photoURL)) {
        setShowProfileSetup(true);
        setProfileUsername(user.displayName || '');
        setProfileIcon(user.photoURL || '');
      } else {
        setShowProfileSetup(false);
      }
    });
    return unsubscribe;
  }, [forceProfileEdit]);

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Sign up successful! You are now logged in.');
      setShowProfileSetup(true);
    } catch (err: any) {
      setError('Sign up failed. Please try again.');
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Login successful!');
    } catch (err: any) {
      setError('Login failed. Please check your email and password and try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user.displayName || !user.photoURL) {
        setShowProfileSetup(true);
        setProfileUsername(user.displayName || '');
        setProfileIcon(user.photoURL || '');
      } else {
        setMessage('Google sign-in successful!');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMessage('Logged out.');
  };

  const handlePasswordReset = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('Password reset email sent!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleProfileSetup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (!profileUsername.trim()) throw new Error('Username required');
      if (!profileIcon) throw new Error('Please select an icon');
      if (!auth.currentUser) throw new Error('No user');
      await updateProfile(auth.currentUser, {
        displayName: profileUsername.trim(),
        photoURL: profileIcon
      });
      setShowProfileSetup(false);
      setMessage('Profile updated!');
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-blue-100 relative">
          {onClose && (
            <button
              className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-slate-700"
              onClick={onClose}
              aria-label="Close"
            >×</button>
          )}
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            {user ? 'Account' : showReset ? 'Reset Password' : 'Sign In to Your Account'}
          </h2>
          {showProfileSetup ? (
            <form onSubmit={handleProfileSetup} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Choose a username"
                value={profileUsername}
                onChange={e => setProfileUsername(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                {iconOptions.map(icon => (
                  <button
                    type="button"
                    key={icon}
                    className={`text-3xl p-2 rounded-full border-2 ${profileIcon === icon ? 'border-blue-500 bg-blue-100' : 'border-transparent'}`}
                    onClick={() => setProfileIcon(icon)}
                    aria-label={`Choose icon ${icon}`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Save Profile</button>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              {message && <p className="text-green-600 mt-2">{message}</p>}
            </form>
          ) : user ? (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 font-bold mb-2">
                  {user.photoURL || profileIcon ? (
                    <span>{user.photoURL || profileIcon}</span>
                  ) : (
                    <span>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '?'}</span>
                  )}
                </div>
                <div className="text-lg font-semibold text-blue-800">{user.displayName || user.email}</div>
              </div>
              {message && <p className="text-green-600 mt-2">{message}</p>}
            </div>
          ) : showReset ? (
            <form onSubmit={handlePasswordReset} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Send Reset Email</button>
              <button type="button" onClick={() => setShowReset(false)} className="w-full py-2 bg-slate-200 text-blue-700 rounded-lg font-semibold shadow hover:bg-slate-300 transition">Back to Login</button>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              {message && <p className="text-green-600 mt-2">{message}</p>}
            </form>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Login</button>
                <button type="button" onClick={handleSignup} className="flex-1 py-2 bg-slate-200 text-blue-700 rounded-lg font-semibold shadow hover:bg-slate-300 transition">Sign Up</button>
              </div>
              <button type="button" onClick={handleGoogleLogin} className="w-full py-2 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-100 transition flex items-center justify-center gap-2">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5" />
                <span className="font-medium">Sign in with Google</span>
              </button>
              <button type="button" onClick={() => setShowReset(true)} className="w-full py-2 bg-slate-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-slate-200 transition">
                Forgot Password?
              </button>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              {message && <p className="text-green-600 mt-2">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForms;
