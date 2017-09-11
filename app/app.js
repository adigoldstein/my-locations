import 'normalize.css/normalize.css';
import './assets/styles/main.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import  store from './store'
import { Provider } from 'react-redux';

import Root from './components/root/Root';

ReactDOM.render(
  <Provider store={ store }>
    <Root/>
  </Provider>, document.querySelector('#root'));
