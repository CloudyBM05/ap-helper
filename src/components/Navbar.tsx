import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { 
  GraduationCap, 
  Menu, 
  X, 
  FileText, 
  BookOpen, 
  Brain, 
  Wrench 
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
    { name: 'Essay Grader', href: '/essay-grader', icon: FileText },
    { name: 'Study Guides', href: '/study-guides', icon: BookOpen },
    { name: 'Practice Exams', href: '/practice-exams', icon: Brain },
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
    <nav className="w-full bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-50 border-b border-blue-100">
      {/* Left: Logo and Home */}
      <div>
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-700 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            AP Helper
          </span>
        </Link>
      </div>
      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
        <Link
          to="/notes"
          className="text-blue-700 font-semibold hover:underline transition"
        >
          Notes & Flashcards
        </Link>
        <Link
          to="/grade-games"
          className="text-blue-700 font-semibold hover:underline transition"
        >
          Grade Games
        </Link>
      </div>
      {/* Right: Profile/Login */}
      <div className="relative" ref={profileRef}>
        {firebaseUser ? (
          <>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="mr-2">👤</span>
              <span>{firebaseUser.displayName || firebaseUser.email}</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  onClick={() => { setProfileOpen(false); if (typeof onEditProfile === 'function') onEditProfile(); }}
                >Edit Profile</button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  onClick={handleLogout}
                >Logout</button>
              </div>
            )}
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate('/login')}
          >Login</button>
        )}
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden py-4 border-t border-blue-100">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link
              to="/notes"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-blue-700 font-semibold hover:underline transition"
            >
              Notes & Flashcards
            </Link>
            <Link
              to="/grade-games"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-blue-700 font-semibold hover:underline transition"
            >
              Grade Games
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;