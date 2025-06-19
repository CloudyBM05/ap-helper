import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Note = {
  id: number;
  author: string;
  title: string;
  topic: string;
  type: 'notes' | 'flashcards';
  content?: string;
  created: string;
  docUrl?: string;
  flashcards?: { front: string; back: string }[];
};

const TOPIC_OPTIONS = ['APUSH', 'AP Gov', 'AP World'];

const NotesFeed: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('apush_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'notes' | 'flashcards' | ''>('');
  const [content, setContent] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [flashcards, setFlashcards] = useState<{ front: string; back: string }[]>([]);
  const [flashFront, setFlashFront] = useState('');
  const [flashBack, setFlashBack] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const user = localStorage.getItem('apush_user');

  // Collect all unique topics (titles) for filtering
  const noteTitles = Array.from(new Set(notes.map(note => note.title.trim()).filter(Boolean)));
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  // Filter notes by search and/or topic
  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      search.trim() === '' ||
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      (note.content && note.content.toLowerCase().includes(search.toLowerCase())) ||
      (note.flashcards &&
        note.flashcards.some(
          fc =>
            fc.front.toLowerCase().includes(search.toLowerCase()) ||
            fc.back.toLowerCase().includes(search.toLowerCase())
        ));
    const matchesTopic = !selectedTopic || note.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!title.trim() || !type || !topic) return;
    if (type === 'notes' && !content.trim() && !docUrl.trim()) return;
    if (type === 'flashcards' && flashcards.length === 0) return;
    const newNote: Note = {
      id: Date.now(),
      author: user,
      title: title.trim(),
      topic,
      type,
      content: type === 'notes' ? content : undefined,
      created: new Date().toLocaleString(),
      docUrl: type === 'notes' && docUrl.trim() ? docUrl.trim() : undefined,
      flashcards: type === 'flashcards' ? flashcards : undefined,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem('apush_notes', JSON.stringify(updated));
    setTitle('');
    setTopic('');
    setType('');
    setContent('');
    setDocUrl('');
    setFlashcards([]);
  };

  const handleAddFlashcard = () => {
    if (flashFront.trim() && flashBack.trim()) {
      setFlashcards([...flashcards, { front: flashFront, back: flashBack }]);
      setFlashFront('');
      setFlashBack('');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AP Helper Notes & Flashcards</h1>
        </div>
        {user ? (
          <form onSubmit={handlePost} className="mb-8 space-y-4">
            {/* Topic selection */}
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
            >
              <option value="">Select a topic</option>
              {TOPIC_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {/* Title input */}
            <input
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="text"
              placeholder="Title for your notes or flashcards"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            {/* Type selection */}
            <div className="flex gap-4 mb-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  type === 'notes'
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setType('notes')}
              >
                Notes
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold border transition ${
                  type === 'flashcards'
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => setType('flashcards')}
              >
                Flashcards
              </button>
            </div>
            {/* Notes input */}
            {type === 'notes' && (
              <>
                <textarea
                  className="w-full min-h-[80px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Share your AP notes, tips, or resources..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />
                <input
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  type="url"
                  placeholder="Paste a link to your Google Doc or PDF (optional)"
                  value={docUrl}
                  onChange={e => setDocUrl(e.target.value)}
                />
              </>
            )}
            {/* Flashcard creation */}
            {type === 'flashcards' && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="font-semibold mb-2">Add Flashcards</div>
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <input
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    type="text"
                    placeholder="Front"
                    value={flashFront}
                    onChange={e => setFlashFront(e.target.value)}
                  />
                  <input
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                    type="text"
                    placeholder="Back"
                    value={flashBack}
                    onChange={e => setFlashBack(e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={handleAddFlashcard}
                  >
                    Add
                  </button>
                </div>
                {flashcards.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {flashcards.map((fc, idx) => (
                      <div key={idx} className="bg-blue-100 px-3 py-2 rounded">
                        <span className="font-bold">{fc.front}</span> → {fc.back}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Publish
            </button>
          </form>
        ) : (
          <div className="mb-8 text-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => navigate('/login')}
            >
              Log in to publish your notes
            </button>
          </div>
        )}

        {/* --- Add more space between publish and search --- */}
        <div className="my-12" />

        {/* --- Search and Topic Filter Section --- */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search notes or flashcards..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-slate-300 rounded-lg"
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {TOPIC_OPTIONS.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        {/* --- Notes/Flashcards Feed --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredNotes.length === 0 ? (
            <div className="text-slate-500 text-center col-span-full">No notes found. Try a different search or topic!</div>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="bg-blue-50 rounded-xl shadow p-4 border border-blue-100 flex flex-col h-full">
                <div className="mb-2">
                  <span className="font-bold text-blue-700">{note.title}</span>
                  <span className="ml-2 text-xs text-slate-500">
                    ({note.type === 'notes' ? 'Notes' : 'Flashcards'}) - {note.topic}
                  </span>
                </div>
                {note.type === 'notes' && (
                  <>
                    <div className="mb-2 text-slate-700">{note.content}</div>
                    {note.docUrl && (
                      <div className="mb-2">
                        <a
                          href={note.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View Document
                        </a>
                      </div>
                    )}
                  </>
                )}
                {note.type === 'flashcards' && note.flashcards && note.flashcards.length > 0 && (
                  <div className="mb-2">
                    <div className="font-semibold mb-1">Flashcards:</div>
                    <div className="flex flex-wrap gap-2">
                      {note.flashcards.map((fc, idx) => (
                        <div key={idx} className="bg-blue-100 px-3 py-2 rounded">
                          <span className="font-bold">{fc.front}</span> → {fc.back}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-auto text-xs text-slate-500 pt-2">
                  Posted by <span className="font-semibold">{note.author}</span> on {note.created}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = localStorage.getItem('apush_user');
  const [note, setNote] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'notes' | 'flashcards' | ''>('');
  const [content, setContent] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [flashcards, setFlashcards] = useState<{ front: string; back: string }[]>([]);
  const [flashFront, setFlashFront] = useState('');
  const [flashBack, setFlashBack] = useState('');

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('apush_notes') || '[]');
    const found = notes.find((n: any) => n.id === Number(id) && n.author === user);
    if (!found) {
      navigate('/notes');
      return;
    }
    setNote(found);
    setTitle(found.title || '');
    setTopic(found.topic || '');
    setType(found.type || '');
    setContent(found.content || '');
    setDocUrl(found.docUrl || '');
    setFlashcards(found.flashcards || []);
  }, [id, user, navigate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !type || !topic) return;
    if (type === 'notes' && !content.trim() && !docUrl.trim()) return;
    if (type === 'flashcards' && flashcards.length === 0) return;
    const notes = JSON.parse(localStorage.getItem('apush_notes') || '[]');
    const updated = notes.map((n: any) =>
      n.id === Number(id)
        ? {
            ...n,
            title: title.trim(),
            topic,
            type,
            content: type === 'notes' ? content : undefined,
            docUrl: type === 'notes' && docUrl.trim() ? docUrl.trim() : undefined,
            flashcards: type === 'flashcards' ? flashcards : undefined,
          }
        : n
    );
    localStorage.setItem('apush_notes', JSON.stringify(updated));
    navigate('/notes');
  };

  const handleAddFlashcard = () => {
    if (flashFront.trim() && flashBack.trim()) {
      setFlashcards([...flashcards, { front: flashFront, back: flashBack }]);
      setFlashFront('');
      setFlashBack('');
    }
  };

  if (!note) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center space-y-4"
      >
        <h1 className="text-2xl font-bold mb-2">Edit Note</h1>
        <select
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
        >
          <option value="">Select a topic</option>
          {['APUSH', 'AP Gov', 'AP World'].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          placeholder="Title for your notes or flashcards"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <div className="flex gap-4 mb-2">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold border transition ${
              type === 'notes'
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => setType('notes')}
          >
            Notes
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold border transition ${
              type === 'flashcards'
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => setType('flashcards')}
          >
            Flashcards
          </button>
        </div>
        {type === 'notes' && (
          <>
            <textarea
              className="w-full min-h-[80px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Share your AP notes, tips, or resources..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              type="url"
              placeholder="Paste a link to your Google Doc or PDF (optional)"
              value={docUrl}
              onChange={e => setDocUrl(e.target.value)}
            />
          </>
        )}
        {type === 'flashcards' && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full">
            <div className="font-semibold mb-2">Add Flashcards</div>
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
              <input
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                type="text"
                placeholder="Front"
                value={flashFront}
                onChange={e => setFlashFront(e.target.value)}
              />
              <input
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg"
                type="text"
                placeholder="Back"
                value={flashBack}
                onChange={e => setFlashBack(e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleAddFlashcard}
              >
                Add
              </button>
            </div>
            {flashcards.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {flashcards.map((fc, idx) => (
                  <div key={idx} className="bg-blue-100 px-3 py-2 rounded">
                    <span className="font-bold">{fc.front}</span> → {fc.back}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="mt-2 px-6 py-2 bg-slate-200 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition"
          onClick={() => navigate('/notes')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NotesFeed;
