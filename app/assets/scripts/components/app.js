import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config';

// components
import Header from './header';
import Footer from './footer';
import Frontpage from './frontpage';

let App = React.createClass({

  getInitialState: function () {
    return {
      width: null,
      height: null
    };
  },

  render: function () {
    return (
      <div className='main'>
        <div className='row'>
          <div className='small-12 columns'>
            <Header />
            <br />
            <Frontpage />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

export default App;
