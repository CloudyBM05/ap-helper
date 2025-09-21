import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  updateProfile
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

interface AuthFormsProps {
  forceProfileEdit?: boolean;
  onClose?: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ forceProfileEdit = false, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showProfileSetup, setShowProfileSetup] = useState(forceProfileEdit);
  const [profileUsername, setProfileUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState('');
  const [googlePhoto, setGooglePhoto] = useState<string | null>(null);

  const iconOptions = [
    '🦅', '📚', '🎓', '🏆', '🌟', '🧠', '⚡', '🔥', '🚀', '🎯', '💡', '📝', '🏛️', '🇺🇸', '👩‍🎓', '👨‍🎓'
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      setUser(user);
      if (!user) {
        setShowProfileSetup(false);
        setGooglePhoto(null);
        return;
      }

      let googlePhotoUrl: string | null = null;
      if (user.providerData) {
        for (const provider of user.providerData) {
          if (provider.providerId === 'google.com' && provider.photoURL) {
            googlePhotoUrl = provider.photoURL;
            break;
          }
        }
      }
      
      setGooglePhoto(googlePhotoUrl);

      const shouldUpdatePhoto = googlePhotoUrl && (!user.photoURL || (user.photoURL.startsWith('http') && user.photoURL !== googlePhotoUrl));

      if (shouldUpdatePhoto) {
        try {
          await updateProfile(user, { photoURL: googlePhotoUrl });
          setUser({ ...user, photoURL: googlePhotoUrl! });
        } catch (error) {
          console.error("Error auto-updating profile photo from Google:", error);
        }
      }

      if (forceProfileEdit || !user.displayName || !user.photoURL) {
        setShowProfileSetup(true);
        setProfileUsername(user.displayName || '');
        setProfileIcon(user.photoURL || googlePhotoUrl || '');
      } else {
        setShowProfileSetup(false);
      }
    });
    return unsubscribe;
  }, [forceProfileEdit]);

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
          {(!forceProfileEdit && onClose) && (
            <button
              className="absolute top-4 right-4 text-2xl text-slate-400 hover:text-slate-700"
              onClick={onClose}
              aria-label="Close"
            >×</button>
          )}
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            {user ? 'Account' : 'Sign In with Google'}
          </h2>
          {/* Show profile setup if: forced, or user is new (no displayName or photoURL) */}
          {(showProfileSetup || (user && (!user.displayName || !user.photoURL))) ? (
            <>
              <div className="flex flex-col items-center mb-4">
                {profileIcon && profileIcon.startsWith('http') ? (
                  <img src={profileIcon} alt="Profile preview" className="w-16 h-16 rounded-full object-cover border-2 border-blue-300 mb-2" />
                ) : profileIcon ? (
                  <span className="text-5xl mb-2">{profileIcon}</span>
                ) : (
                  <span className="text-5xl mb-2">👤</span>
                )}
                {/* Remove welcome text for profile edit. Only show for new users or initial setup. */}
                {(showProfileSetup || (user && (!user.displayName || !user.photoURL))) && !user && (
                  <span className="text-sm text-blue-600 font-medium bg-blue-50 rounded px-2 py-1 mt-1">
                    Welcome! Please set your username and profile icon below. You can always change it later from the top right menu.
                  </span>
                )}
              </div>
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
                  {googlePhoto && (
                    <button
                      type="button"
                      key="google-photo"
                      className={`flex flex-col items-center p-1 rounded-full border-2 mb-2 ${profileIcon === googlePhoto ? 'border-blue-500 bg-blue-100' : 'border-transparent'}`}
                      onClick={() => setProfileIcon(googlePhoto)}
                      aria-label="Use Google profile photo"
                    >
                      <img src={googlePhoto} alt="Google profile" className="w-12 h-12 rounded-full object-cover mb-1" />
                      <span className="text-xs">Use Google Profile Photo</span>
                    </button>
                  )}
                  {googlePhoto && !iconOptions.includes(googlePhoto) && (
                    <div className="w-full h-0.5 bg-slate-200 my-2" />
                  )}
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
            </>
          ) : user ? (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-600 font-bold mb-2">
                  {user.photoURL && user.photoURL.startsWith('http') ? (
                    <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-blue-300" />
                  ) : user.photoURL && user.photoURL.length === 1 ? (
                    <span>{user.photoURL}</span>
                  ) : (
                    <span>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || '👤'}</span>
                  )}
                </div>
                <div className="text-lg font-semibold text-blue-800">{user.displayName || user.email}</div>
                <div className="text-sm text-blue-600 mt-2 text-center">You can edit your username and profile icon anytime from the top right menu.</div>
              </div>
              <button 
                onClick={handleLogout} 
                className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
              >
                Sign Out
              </button>
              {!showProfileSetup && message && <p className="text-green-600 mt-2">{message}</p>}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-6 text-center">
                Sign in to access all features and save your progress.
              </p>
              <button 
                type="button" 
                onClick={handleGoogleLogin} 
                className="w-full py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold shadow hover:bg-gray-100 transition flex items-center justify-center gap-3"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-6 h-6" />
                <span className="font-medium text-lg">Sign in with Google</span>
              </button>
              {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
              {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForms;
