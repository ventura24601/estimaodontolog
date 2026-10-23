import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Metadados estáticos do index.html servem crawlers sem JS; com o app ativo, cada página define os seus.
document.querySelectorAll('[data-static]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
