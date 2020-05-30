import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import AppRouter, {history} from './router/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


ReactDOM.render(<AppRouter />,document.querySelector('#app'));
