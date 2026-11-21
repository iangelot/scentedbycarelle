import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './responsive-overrides.css';
import CollectionPage from './components/CollectionPage.jsx';

const Page = window.location.pathname.replace(/\/$/, '') === '/collection' ? CollectionPage : App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);

