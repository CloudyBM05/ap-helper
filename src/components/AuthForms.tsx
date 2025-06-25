import React, { useState, ChangeEvent, FormEvent } from 'react';

const API_URL = 'https://your-backend.onrender.com';

export function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setMessage('Registration successful!');
    else setMessage(data.detail || 'Registration failed.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="text-lg text-blue-600 font-semibold">Coming soon!</div>
      </form>
    </div>
  );
}

export function Login({ onLogin }: { onLogin?: (username: string) => void }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Login successful!');
      if (onLogin) {
        onLogin(form.username);
      } else {
        // Default: set localStorage and redirect
        localStorage.setItem('apush_user', form.username);
        window.location.href = '/';
      }
    } else setMessage(data.detail || 'Login failed.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="text-lg text-blue-600 font-semibold">Coming soon!</div>
      </form>
    </div>
  );
}
