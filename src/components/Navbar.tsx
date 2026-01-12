import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  Brain, 
  MessageCircle,
  Star
} from 'lucide-react';
import { User, signOut } from 'firebase/auth';

interface NavbarProps {
  onEditProfile?: () => void;
  onShowAuth?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onEditProfile, onShowAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const navigation = [
    { name: 'Socratic Learning', href: '/socratic-learning', icon: MessageCircle },
    { name: 'Study Guides', href: '/study-guides', icon: BookOpen },
    { name: 'Practice Exams', href: '/practice-exams', icon: Brain },
    { name: 'Collections', href: '/collections', icon: Star },
    // { name: 'Arena', href: '/arena', icon: Zap }, // Coming soon - hidden for now
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);

  useEffect(() => {
    // Always listen for auth state changes globally
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: User | null) => {
      setFirebaseUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 flex items-center justify-between px-6 lg:px-8 py-4 sticky top-0 z-50">
      {/* Left: Logo and Home */}
      <div>
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
            AP Helper
          </span>
        </Link>
      </div>
      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center space-x-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${
                isActive(item.href) ? 'text-white' : 'group-hover:scale-110'
              }`} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
      {/* Right: Profile/Login */}
      <div className="relative" ref={profileRef}>
        {firebaseUser ? (
          <>
            <button
              className="flex items-center px-5 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-slate-900 transition-all duration-300 focus:outline-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="mr-3">
                {firebaseUser.photoURL && /^[^\w\s]{1,2}$/u.test(firebaseUser.photoURL) ? (
                  <span className="text-xl">{firebaseUser.photoURL}</span> // emoji
                ) : firebaseUser.photoURL && firebaseUser.photoURL.startsWith('http') ? (
                  <img src={firebaseUser.photoURL} alt="Profile" className="w-8 h-8 rounded-full bg-white object-cover shadow-sm" />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </span>
              <span className="text-sm max-w-32 truncate">{firebaseUser.displayName || firebaseUser.email}</span>
              <svg className="ml-2 w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="p-2">
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium text-slate-700 hover:text-blue-600"
                    onClick={() => { setProfileOpen(false); if (typeof onEditProfile === 'function') onEditProfile(); }}
                  >
                    ✏️ Edit Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-md"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/50 shadow-xl">
          <div className="px-6 py-6 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-4 px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 hover:shadow-md'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive(item.href) ? 'text-white' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;