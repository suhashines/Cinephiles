import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "http://localhost:3000/";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        store={store}
      </Provider>
      <App />
    </BrowserRouter>    
  </React.StrictMode>
);
