import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { AuthProvider } from './contexts/authcontext';
const root = createRoot(document.getElementById('root')); // Create a root

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
