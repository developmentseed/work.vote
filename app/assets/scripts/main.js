'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import store from './store';

// Components
import App from './components/app';
import Result from './components/result';
import About from './components/about';

const history = createHashHistory({queryKey: false});
syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='j(/:name)' component={Result} />
        <Route path='about' component={About} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('site-canvas')
);
