'use strict';

import nets from 'nets';
import React from 'react';
import config from '../config';
import Box from '../components/box';

let Contact = React.createClass({

  submitForm: function(event) {
    let contact = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      comment: this.refs.comment.value
    };

    console.log(this.refs.name.value);
    nets({
      method: 'post',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: `${config.apiUrl}/contacts/us/`
    }, function (err, resp, body) {
    });
  },

  render: function () {
    return (
      <Box>
        <div className='results-split-container'>
          <div className = 'large-12 columns text-header'>Contact Us </div>
          <hr />

          <div className='large-6 medium-6 columns'>
            <div id='contact-form'>
              <div className='contact-questions'>Name </div>
              <input className='form__control' type='text' placeholder='First and Last Name' ref="name" />
              <div className='large-12 columns contact-questions'>Email </div>
              <input className='form__control' type='text' placeholder='Email' ref="email" />
              <div className='large-12 columns contact-questions'>Comment or Questions</div>
              <textarea className='form__control' type='text' placeholder='Type Here' ref="comment" />
              <div className='btn' onClick={this.submitForm}>Submit</div>
            </div>
          </div>

          <div className='large-6 medium-6 columns'>
            <div className='contact-address'>
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
