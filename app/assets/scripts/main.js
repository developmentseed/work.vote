'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import { syncHistory } from 'react-router-redux';
import reducer from './reducers/reducer';

// Views
import App from './views/app';
import Page from './views/page';
import Result from './views/result';
import States from './views/states';
import Frontpage from './views/frontpage';
import Contact from './views/contact';
import Empty from './views/404';

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  reduxRouterMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='j(/:jurisdiction_id)' component={Result} />
        <Route path='p(/:slug)' component={Page} />
        <Route path='contact' component={Contact} />
        <Route path='states(/:state_id)' component={States} />
        <Route path='*' component={Empty}/>
        <IndexRoute component={Frontpage} />
      </Route>

    </Router>
  </Provider>,
  document.getElementById('site-canvas')
);
