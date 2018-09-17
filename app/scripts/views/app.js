'use strict';

import React from 'react';
import { Route } from 'react-router-dom';

// components
import Header from '../components/header';
import Footer from '../components/footer';
import Frontpage from './frontpage';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      width: null,
      height: null
    }
  }

  render () {
    return (
      <div className='main'>
        <div className='row'>
          <div className='small-12 columns'>
            <Header />
            <br />
            <Route exact path='/' component={Frontpage} />
            {/* {this.props.children} */}
          </div>
        </div>
        <Footer />
      </div>
    ); 
  }
}

export default App;
