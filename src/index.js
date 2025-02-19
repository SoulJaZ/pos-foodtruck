import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoreProvider } from './utils/Store';
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>
);

