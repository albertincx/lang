import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';

import Loader from './components/Loading/Loader';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';

import 'toastify-js/src/toastify.css';
import './css/styles.css';

const initialState = {};
const store = configureStore(initialState);
const { location } = window;

ReactDOM.render(
  <Provider store={store}>
    <DefaultLayout />
  </Provider>,
  document.getElementById('root'),
);

require('./push-init').default();

String.prototype.format = function() {
  return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
};
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require
  runtime.install({
    onUpdating: () => {
      const not = document.createElement('div');
      not.setAttribute('class', 'upd-notify');
      not.innerHTML = `<div class="text loader-mini">updating...<br />reloading <div  id="upd-notify"></div></div>`;
      document.body.appendChild(not);
      ReactDOM.render(<Loader />, document.getElementById('upd-notify'));
    },
    onUpdateReady: () => {
      runtime.applyUpdate();
    },
    onUpdated: () => {
      location.reload();
    },
    onUpdateFailed: () => {
      console.info('SW Event:', 'onUpdateFailed');
    },
  });
}
