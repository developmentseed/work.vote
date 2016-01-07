'use strict';

import React from 'react';

// components
import Header from './header';
import Footer from './footer';
import Frontpage from './frontpage';

let App = React.createClass({

  propTypes: {
    children: React.PropTypes.object
  },

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
            {this.props.children || <Frontpage />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

export default App;
