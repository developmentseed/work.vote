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
            <div className = 'contact-questions'>Name </div>
            <div className= 'large-6 medium-6 columns'>
              <input class="form__control" type="text" placeholder="First and Last Name" id="control-1" />
            </div>
            <div className = 'large-12 columns contact-questions'>Email </div>
            <div className= 'large-6 medium-6 columns'>
              <input class="form__control" type="text" placeholder="Email" id="control-1" />
            </div>
            <div className = 'large-12 columns contact-questions'>Comment or Questions</div>
            <div className= 'large-6 medium-6 columns'>
             <textarea class="form__control" type="text" placeholder="Type Here" id="control-1" />
            </div>
            <div className = 'large-12 columns'>
              <div className = 'btn'>Submit</div>
            </div>
        </div>
      </Box>
		);
  }
});

module.exports = Contact;
