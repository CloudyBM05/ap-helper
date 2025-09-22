import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

console.log('Main.tsx loading...');

const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

console.log('Root element found, creating React app...');

try {
  createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
}
