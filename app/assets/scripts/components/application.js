'use strict';

import _ from 'lodash';
import nets from 'nets';
import React from 'react';
import validator from 'email-validator';
import config from '../config';
import classNames from 'classnames';
var Select = require('react-select');

let Application = React.createClass({

  propTypes: {
    jurisdiction_id: React.PropTypes.number,
    onSubmit: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      jurisdiction_id: 0
    };
  },

  getInitialState: function () {
    return {
      formError: false,
      submittingForm: false,
      errorMessage: null
    };
  },

  submitForm: function (event) {
    window.scrollTo(0, 0);

    let missingFields = [];

    let values = {
      jurisdiction_id: this.props.jurisdiction_id,
      first_name: document.getElementsByName('firstName')[0].value,
      last_name: document.getElementsByName('lastName')[0].value,
      city: document.getElementsByName('city')[0].value,
      county: document.getElementsByName('county')[0].value,
      email: document.getElementsByName('email')[0].value,
      phone: document.getElementsByName('phone')[0].value,
      age: parseInt(document.getElementsByName('age')[0].value, 10),
      languages: document.getElementsByName('languages')[0].value.split(','),
      technology: parseInt(document.getElementsByName('technology')[0].value, 10)
    };

    let requiredFields = [
      'first_name', 'last_name', 'city', 'county', 'email'
    ];

    for (let i in requiredFields) {
      if (_.isEmpty(values[requiredFields[i]])) {
        missingFields.push(requiredFields[i]);
      }
    }

    if (missingFields.length > 0) {
      this.setState({
        submittingForm: false,
        formError: true,
        errorMessage: 'These required fields are missing: ' + missingFields.join(', ')
      });
      return;
    }

    if (!validator.validate(values['email'])) {
      this.setState({
        submittingForm: false,
        formError: true,
        errorMessage: 'Inavlid email provided. Please provided a valid email address.'
      });
      return;
    }

    this.setState({submittingForm: true});

    let self = this;

    nets({
      method: 'post',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: `${config.apiUrl}/contacts/survey/`
    }, function (err, resp, body) {
      if (err) console.log(err);
      self.setState({
        submittingForm: false,
        formError: false
      });

      self.props.onSubmit();
    });
  },

  render: function () {
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

    let ageOptions = [
        { value: 0, label: '16 to 18' },
        { value: 1, label: '19 to 25' },
        { value: 2, label: '26 to 35' },
        { value: 3, label: '36 to 50' },
        { value: 4, label: '51 to 50' },
        { value: 5, label: '65 and older' }
    ];

    let languageOptions = [
      { value: 'Arabic', label: 'Arabic' },
      { value: 'Bengali', label: 'Bengali' },
      { value: 'Cantonese', label: 'Cantonese' },
      { value: 'Hopi', label: 'Hopi' },
      { value: 'Hindi', label: 'Hindi' },
      { value: 'Japanese', label: 'Japanese' },
      { value: 'Korean', label: 'Korean' },
      { value: 'Navajo', label: 'Navajo' },
      { value: 'O\'odham', label: 'O\'odham' },
      { value: 'Persian', label: 'Persian' },
      { value: 'Quechan/Yumac', label: 'Quechan/Yuma' },
      { value: 'Spanish', label: 'Spanish' },
      { value: 'Tagalog', label: 'Tagalog' },
      { value: 'Vietnamese', label: 'Vietnamese' },
      { value: 'Yaqui', label: 'Yaqui' },
      { value: 'Zuni', label: 'Zuni' }
    ];

    let i = 1;
    let technologyOptions = [];
    while (i < 11) {
      technologyOptions.push({
        value: i, label: i.toString()
      });
      i++;
    }

    return (
      <application>
        <div className='text-header'>Application</div>

        <div className={calloutClassError} name='error'>
          <p>{this.state.errorMessage}</p>
        </div>

        <p><em>This application generates an email that is sent to the local election official for your city or county. Workelections.com does not retain your personal information.</em></p>

        <label>
          First Name:<span className='red'>*</span>
          <input type='text' name='firstName' placeholder='First Name' />
        </label>

        <label>
          Last Name:<span className='red'>*</span>
          <input type='text' name='lastName' placeholder='Last Name' />
        </label>

        <label>
          City:<span className='red'>*</span>
          <input type='text' name='city' placeholder='City' />
        </label>

        <label>
          County:<span className='red'>*</span>
          <input type='text' name='county' placeholder='County' />
        </label>

        <label>
          Email:<span className='red'>*</span>
          <input type='text' name='email' placeholder='Email' />
        </label>

        <label>
          Phone:
          <input type='text' name='phone' placeholder='Phone' />
        </label>

        <label>What is your age?
          <Select
              name='age'
              options={ageOptions}
          />
        </label>

        <label>What languages do you speak other than English?
          <Select
              name='languages'
              options={languageOptions}
              multi
          />
        </label>

        <label>
          How familiar are you with working with computer technology on a scale of 1 to 10?
          <Select
              name='technology'
              options={technologyOptions}
          />
        </label>

        <div className='btn' onClick={this.submitForm}>Submit</div><span className={submitLabel} name='label'>Sending... Please wait!</span>

        <p><span className='red'>* are required</span></p>

      </application>
    );
  }
});

module.exports = Application;
