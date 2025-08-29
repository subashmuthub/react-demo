import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Use this only if App is in App.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
