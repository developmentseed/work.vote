'use strict';

import d3 from 'd3';
import nets from 'nets';
import React from 'react';
import config from '../config';
import Box from '../components/box';

let Contact = React.createClass({

  submitForm: function (event) {
    let contact = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      comment: this.refs.comment.value
    };

    // Make sure error message is hidden first
    d3.select(this.refs.error).classed('hide', true);

    if (contact.email === '') {
      d3.select(this.refs.error).classed('hide', false);
      return;
    }

    d3.select(this.refs.label).classed('hide', false);

    let self = this;

    nets({
      method: 'post',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: `${config.apiUrl}/contacts/us/`
    }, function (err, resp, body) {
      d3.select(self.refs.label).classed('hide', true);
      d3.select(self.refs.messageSent).classed('hide', false);
    });
  },

  render: function () {
    return (
      <Box>
        <div className='results-split-container'>
          <div className='large-12 columns text-header'>Contact Form</div>
          <hr />

          <div className='callout success hide' ref='messageSent'>
            <p>Your message was sent. Thank you!</p>
          </div>

          <div className='callout alert hide' ref='error'>
            <p>You must provide either your email address!</p>
          </div>

          <div className='large-6 medium-6 columns'>
            <div id='contact-form'>
              <div className='contact-questions'>Name </div>
              <input className='form__control' type='text' placeholder='First and Last Name' ref='name' />
              <div className='large-12 columns contact-questions'>Email <span className='red'>*</span></div>
              <input className='form__control' type='text' placeholder='Email' ref='email' />
              <div className='large-12 columns contact-questions'>Comment or Questions</div>
              <textarea className='form__control' type='text' placeholder='Type Here' ref='comment' />
              <div className='btn' onClick={this.submitForm}>Submit</div>   <span className='warning label hide' ref='label'>Sending... Please wait!</span>
            </div>
          </div>

          <div className='large-6 medium-6 columns'>
            <div className='contact-address'>
              <p>1825 K St. NW Suite 450</p>
              <p>Washington DC, 20006</p>
              <p>(202) 331-1550</p>
              <p>info@fairelectionsnetwork.com</p>
            </div>
          </div>

        </div>
      </Box>
    );
  }
});

module.exports = Contact;
