import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FaceChat from './components/FaceChat/FaceChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <FaceChat />
  </React.StrictMode>
);

