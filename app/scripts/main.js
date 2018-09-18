'use strict';

import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import store from './get-store';

// Views
import State from './views/state';
import States from './views/states';
import Jurisdiction from './views/jurisdiction';
import Header from './components/header';
import Footer from './components/footer';
import Frontpage from './views/frontpage';
import Page from './views/page';
import Contact from './views/contact';
import Empty from './views/404';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className='main'>
        <div className='row'>
          <div className='small-12 columns'>
            <Header />
            <br />
            <Switch>
              <Route path='/states/:stateId' component={State} />
              <Route exact path='/states' component={States} />
              <Route path='/j/:jurisdictionId' component={Jurisdiction} />
              <Route path='/p/:slug' component={Page} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/' component={Frontpage} />
              <Route component={Empty} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
);

render(<Root />, document.getElementById('site-canvas'));
