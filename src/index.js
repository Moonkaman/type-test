import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>        
        <AuthProvider>
          <App />
        </AuthProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
