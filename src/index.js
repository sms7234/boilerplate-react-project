import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import AppRouter, {history} from './router/AppRouter';
import configureStore from './store/configureStore';
import {login, logout} from './actions/auth';;
import LoadingPage from './components/LoadingPage';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import {firebase} from './firebase/firebase';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx,document.querySelector('#app'));
    hasRendered=true;
  }
}

ReactDOM.render(<LoadingPage />,document.querySelector('#app'));


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    renderApp();
    if (history.location.pathname === '/') {
      history.push('/dashboard');
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
