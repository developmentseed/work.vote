'use stict';

import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => (
  <header>
    <div className='header-block'></div>
    <div className='header-tinyblock'></div>
    <div className='header-title white'>
      <Link to='/'><img src='./graphics/layout/us.svg'></img> Work Elections</Link>
    </div>
    <div className='header-links'>
      <div className='row header-padding'>
        <Link to='/p/pollworker' className='white'>What is a Poll Worker?</Link>
        <Link to='/states' className='white'>States</Link>
        <Link to='/p/about' className='white'>About</Link>
        <Link to='/p/qa' className='white'>Q&A</Link>
        <Link to='/contact' className='white'>Contact</Link>
      </div>
    </div>
  </header>
);

export default Header;
