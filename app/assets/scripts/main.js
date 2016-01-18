'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import reducer from './reducers/reducer';

// Views
import App from './views/app';
import Result from './views/result';
import States from './views/states';
import Frontpage from './views/frontpage';
import About from './views/about';
import Contact from './views/contact';
import Empty from './views/404';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
)(createStore);

const store = createStoreWithMiddleware(reducer);

const history = createHashHistory({queryKey: false});
syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='j(/:jurisdiction_id)' component={Result} />
        <Route path='about' component={About} />
        <Route path='contact' component={Contact} />
        <Route path='states(/:state_id)' component={States} />
        <Route path='*' component={Empty}/>
        <IndexRoute component={Frontpage} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('site-canvas')
);
