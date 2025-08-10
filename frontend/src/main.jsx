import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </BrowserRouter>
);
