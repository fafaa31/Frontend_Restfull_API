import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/auth/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AuthContextProvider> */}
  </React.StrictMode>,
)
