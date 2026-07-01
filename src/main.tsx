import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { UiProvider } from './state/UiContext';
import { registerServiceWorker } from './serviceWorker';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UiProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UiProvider>
  </React.StrictMode>,
);

registerServiceWorker();