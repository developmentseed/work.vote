'use stict';

import React from 'react';

let Header = React.createClass({
  render: function () {
    return (
      <header>
        <div className='header-block'></div>
        <div className='header-tinyblock'></div>
        <div className='header-title white'>
          <a href='/#'><img src='./assets/graphics/layout/us.svg'></img> Work Elections</a>
        </div>
        <div className='header-links'>
          <div className='row header-padding'>
            <a href='' className='white'>Jurisdiction Finder</a>
            <a href='' className='white'>Get Involved</a>
            <a href='' className='white'>About</a>
            <a href='' className='white'>Contact</a>
          </div>
        </div>
      </header>
    );
  }
});

export default Header;

