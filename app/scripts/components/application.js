'use strict';

import _ from 'lodash';
import isEmpty from 'lodash.isempty';
import React from 'react';
import validator from 'email-validator';
import config from '../config';
import classNames from 'classnames';
import Select from 'react-select';

class Application extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      formError: false,
      submittingForm: false,
      errorMessage: null
    };
  }

  submitForm (event) {
    window.scrollTo(0, 0);

    const missingFields = [];

    const values = {
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

    const requiredFields = [
      'first_name', 'last_name', 'city', 'county', 'email'
    ];

    for (const i in requiredFields) {
      if (isEmpty(values[requiredFields[i]])) {
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

    this.setState({ submittingForm: true });

    let self = this;

    // nets({
    //   method: 'post',
    //   body: JSON.stringify(values),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   url: `${config.apiUrl}/contacts/application/`
    // }, function (err, resp, body) {
    //   if (err) console.log(err);

    //   if (resp.statusCode === 200) {
    //     self.setState({
    //       submittingForm: false,
    //       formError: false
    //     });

    //     self.props.onSubmit();
    //   } else {
    //     self.setState({
    //       submittingForm: false,
    //       formError: true,
    //       errorMessage: 'An unexpected error occurred while submitting the form. Please try again!'
    //     });
    //     return;
    //   }
    // });
  }

  render () {
    const calloutClassError = classNames({
      'callout': true,
      'alert': true,
      'hide': !this.state.formError
    });

    const submitLabel = classNames({
      'warning': true,
      'label': true,
      'hide': !this.state.submittingForm
    });

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
              options={config.ageOptions}
          />
        </label>

        <label>What languages do you speak other than English?
          <Select
              name='languages'
              options={config.languageOptions}
              multi
          />
        </label>

        <label>
          How familiar are you with working with computer technology on a scale of 1 to 5?
          <Select
              name='technology'
              options={config.technologyOptions}
          />
        </label>

        <div className='btn' onClick={this.submitForm}>Submit</div><span className={submitLabel} name='label'>Sending... Please wait!</span>

        <p><span className='red'>* are required</span></p>

      </application>
    );
  }
}

module.exports = Application;
