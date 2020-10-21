import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from './store';

import App from './App';

import { history } from './store/history';

import './index.css';

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

