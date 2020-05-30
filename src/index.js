import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, {history} from './router/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


ReactDOM.render(<AppRouter />,document.querySelector('#app'));
