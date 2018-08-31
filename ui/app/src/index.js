import React from 'react';
import ReactDOM from 'react-dom';
// import Home from './components/home';
// import StockList from './App';
import App from './App'
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

//ReactDOM.render(<StockList />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
