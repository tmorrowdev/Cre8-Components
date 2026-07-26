import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Must come before App so cre8 tokens are on :root before components upgrade.
import './index.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
