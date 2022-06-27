import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom/client';

import './localisation';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

if (window.location.port === '3000') {
  Axios.defaults.baseURL = 'http://localhost:80';
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
