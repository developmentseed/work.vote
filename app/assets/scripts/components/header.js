'use stict';

import React from 'react';
import { Link } from 'react-router';

let Header = React.createClass({
  render: function () {
    return (
      <header>
        <div className='header-block'></div>
        <div className='header-tinyblock'></div>
        <div className='header-title white'>
          <Link to='/'><img src='./assets/graphics/layout/us.svg'></img> Work Elections</Link>
        </div>
        <div className='header-links'>
          <div className='row header-padding'>
            <Link to='/pollworker' className='white'>What is a Poll Worker?</Link>
            <Link to='/states' className='white'>States</Link>
            <Link to='/about' className='white'>About</Link>
            <Link to='/contact' className='white'>Contact</Link>
            <a href='https://api.workelections.com' className='white'>API</a>
            <a href='https://github.com/developmentseed/work.vote' className='white'>Github</a>
          </div>
        </div>
      </header>
    );
  }
});

export default Header;

