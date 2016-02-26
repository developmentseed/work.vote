'use strict';

import nets from 'nets';
import React from 'react';
import config from '../config';
import Box from '../components/box';
import classNames from 'classnames';

let Contact = React.createClass({

  getInitialState: function () {
    return {
      formSubmittedSuccess: false,
      formError: false,
      submittingForm: false
    };
  },

  submitForm: function (event) {
    let contact = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      comment: this.refs.comment.value
    };

    this.setState({submittingForm: true});

    if (contact.email === '') {
      this.setState({
        submittingForm: false,
        formSubmittedSuccess: false,
        formError: true
      });
      return;
    }

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
      if (err) console.log(err);
      self.setState({
        submittingForm: false,
        formSubmittedSuccess: true,
        formError: false
      });
    });
  },

  render: function () {
    let calloutClassSuccess = classNames({
      'callout': true,
      'success': true,
      'hide': !this.state.formSubmittedSuccess
    });

    let calloutClassError = classNames({
      'callout': true,
      'alert': true,
      'hide': !this.state.formError
    });

    let submitLabel = classNames({
      'warning': true,
      'label': true,
      'hide': !this.state.submittingForm
    });

    return (
      <Box>
        <div className='results-split-container'>
          <div className='large-12 columns text-header'>Contact Form</div>
          <hr />

          <div className={calloutClassSuccess} >
            <p>Your message was sent. Thank you!</p>
          </div>

          <div className={calloutClassError} ref='error'>
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
              <div className='btn' onClick={this.submitForm}>Submit</div>   <span className={submitLabel} ref='label'>Sending... Please wait!</span>
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
