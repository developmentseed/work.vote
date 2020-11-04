"use strict";

import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import CookieConsent from "react-cookie-consent";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import store from "./get-store";
import config from "./config";

// Views
import State from "./views/state";
import States from "./views/states";
import Jurisdiction from "./views/jurisdiction";
import Header from "./components/header";
import Footer from "./components/footer";
import Frontpage from "./views/frontpage";
import Page from "./views/page";
import Contact from "./views/contact";
import Empty from "./views/404";

const history = createHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

class Root extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
  }

  render() {
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
            <CookieConsent
              location='bottom'
              style={{ background: "#000000" }}
              buttonStyle={{
                color: "#4e503b",
                fontSize: "16px",
                minHeight: "45px",
                minWidth: "130px",
              }}
              expires={30} // How many days should the cookie expire
              onAccept={() => {
                ReactGA.initialize(config.ga);
                ReactPixel.init(config.pixel);
              }}
            >
              We use cookies to improve user experience, and analyze website
              traffic. For these reasons, we may share your site usage data with
              our analytics partners. By clicking “I understand,” you consent to
              store these cookies on your device.
              <span style={{ fontSize: "12px" }}></span>
            </CookieConsent>
          </div>
        </Router>
      </Provider>
    );
  }
}

render(<Root />, document.getElementById("site-canvas"));
