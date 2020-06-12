import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// eslint-disable-next-line
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './assets/style/_index.scss'
ReactDOM.render(<App />,document.getElementById('root'));

serviceWorker.unregister();
