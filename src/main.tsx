import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import HexadecimalProvider from './provider/hexadecimal/Hexadecimal.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HexadecimalProvider>
      <App />
    </HexadecimalProvider>
  </StrictMode>,
);
