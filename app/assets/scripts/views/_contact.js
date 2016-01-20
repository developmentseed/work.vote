'use strict';

import React from 'react';
import Box from '../components/box';

let Contact = React.createClass({
  render: function () {
    return (
      <Box>
        <div className='results-split-container'>
          <div className = 'text-header'>Contact Us *</div>
          <p>First and last name please</p>
          <div className = 'text-header'>Email Addresss *</div>
          <p>Your Answer</p>
          <div className = 'text-header'>Comment or Questions *</div>
          <p>Please leave your comment or question here</p>
          <div className = 'btn'>Submit</div>
        </div>
      </Box>
		);
  }
});

module.exports = Contact;
