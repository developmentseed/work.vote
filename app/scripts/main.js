'use strict';

import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import store from './get-store';
import config from './config';

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

ReactGA.initialize(config.ga);
ReactPixel.init(config.pixel);

const history = createHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class Root extends React.Component {
  componentDidMount () {
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
  }

  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className='main'>
            <div className='row'>
              <div className='small-12 columns'>
                <Header />
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
        </Router>
      </Provider>
    );
  }
}

render(<Root />, document.getElementById('site-canvas'));
