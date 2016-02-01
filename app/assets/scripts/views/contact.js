'use strict';

import React from 'react';
import Box from '../components/box';

let Contact = React.createClass({
  render: function () {
    return (
      <Box>
        <div className='results-split-container'>
          <div className = 'contact-questions'>Contact Us *</div>
          <input class="form__control" type="text" placeholder="Placeholder" id="control-1">
          <div className = 'contact-input'><p>Your Answer</p></div>
          <div className = 'contact-questions'>Comment or Questions *</div>
          <div className = 'contact-input'><p>Please leave your comment or question here</p></div>
          <p><div className = 'btn'>Submit</div></p>
        </div>
      </Box>
		);
  }
});

module.exports = Contact;
