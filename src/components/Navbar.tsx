import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  FileText, 
  BookOpen, 
  Brain, 
  Wrench 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem('apush_user');
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [userNotes, setUserNotes] = useState<any[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

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
    if (user && profileOpen && showNotes) {
      const notes = JSON.parse(localStorage.getItem('apush_notes') || '[]');
      setUserNotes(notes.filter((n: any) => n.author === user));
    }
  }, [user, profileOpen, showNotes]);

  const handleLogout = () => {
    localStorage.removeItem('apush_user');
    setProfileOpen(false);
    navigate('/login');
  };

  const handleScoreHistory = () => {
    alert('Score history coming soon!');
  };

  const handleDeleteNote = (id: number) => {
    const notes = JSON.parse(localStorage.getItem('apush_notes') || '[]');
    const updated = notes.filter((n: any) => n.id !== id);
    localStorage.setItem('apush_notes', JSON.stringify(updated));
    setUserNotes(updated.filter((n: any) => n.author === user));
  };

  const handleEditNote = (id: number) => {
    setProfileOpen(false);
    setShowNotes(false);
    navigate(`/notes/edit/${id}`);
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
        <div className="relative">
          <button
            type="button"
            className="text-blue-700 font-semibold hover:underline transition bg-transparent border-none outline-none cursor-pointer"
            onClick={() => setShowComingSoon((v) => !v)}
          >
            Notes & Flashcards
          </button>
          {showComingSoon && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-white border border-blue-200 rounded-xl shadow-lg px-8 py-6 z-50 text-center min-w-[250px]">
              <div className="text-2xl font-bold text-blue-700 mb-2">Coming Soon!</div>
              <div className="text-slate-600">Notes & Flashcards will be available in a future update.</div>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => setShowComingSoon(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Right: Profile/Login */}
      <div className="relative" ref={profileRef}>
        {user ? (
          <>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="mr-2">👤</span>
              <span>{user}</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  onClick={() => {
                    setShowNotes((v) => !v);
                  }}
                >
                  📝 My Notes
                </button>
                {showNotes && (
                  <div className="max-h-64 overflow-y-auto border-t border-slate-100">
                    {userNotes.length === 0 ? (
                      <div className="px-4 py-2 text-slate-500 text-sm">No notes published yet.</div>
                    ) : (
                      userNotes.map((note) => (
                        <div key={note.id} className="px-4 py-2 border-b border-slate-100 flex flex-col">
                          <div className="font-semibold text-blue-700">{note.title}</div>
                          <div className="text-xs text-slate-500 mb-1">{note.type === 'notes' ? 'Notes' : 'Flashcards'} - {note.topic}</div>
                          <div className="flex gap-2">
                            <button
                              className="text-blue-600 text-xs hover:underline"
                              onClick={() => handleEditNote(note.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 text-xs hover:underline"
                              onClick={() => handleDeleteNote(note.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  onClick={handleScoreHistory}
                >
                  📊 Test Scores
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;