'use strict';

import React from 'react';
import Box from '../components/box';

let Contact = React.createClass({
  render: function () {
    return (
      <Box>
        <div className='results-split-container'>
          <div className = 'large-12 columns text-header'>Contact Us </div>
          <hr />

          <div className= 'large-6 medium-6 columns'>
            <div className = 'contact-questions'>Name </div>
            <input className='form__control' type='text' placeholder='First and Last Name' id='control-1' />
            <div className = 'large-12 columns contact-questions'>Email </div>
            <input className='form__control' type='text' placeholder='Email' id='control-1' />
            <div className = 'large-12 columns contact-questions'>Comment or Questions</div>
            <textarea className='form__control' type='text' placeholder='Type Here' id='control-1' />
            <div className = 'btn'>Submit</div>
          </div>

          <div className= 'large-6 medium-6 columns'>
            <div className = 'contact-address'>
              <p>1825 K St. NW Suite 450</p>
              <p>Washington DC 20006</p>
              <p>(202) 331-1550</p>
              <p>info@fairelectionsnetwork.com</p>
              <p>www.FairElectionsNetwork.com</p>
            </div>
          </div>

        </div>
      </Box>
    );
  }
});

module.exports = Contact;
