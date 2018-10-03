'use strict';

import isEmpty from 'lodash.isempty';
import React from 'react';
import { connect } from 'react-redux';
import config from '../config';
import classNames from 'classnames';
import Select from 'react-select';
import {
  formHasMissingFields,
  submitFormStarted,
  postForm
} from '../actions';

class Application extends React.Component {
  constructor (props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm (event) {
    window.scrollTo(0, 0);
    this.props.submitFormStarted();

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
      return this.props.formHasMissingFields(missingFields);
    }

    return this.props.postForm('/contacts/application/', values);
  }

  render () {
    const { formError, errorMessage, submittingForm } = this.props.form;
    const calloutClassError = classNames({
      'callout': true,
      'alert': true,
      'hide': !formError
    });

    const submitLabel = classNames({
      'warning': true,
      'label': true,
      'hide': !submittingForm
    });

    return (
      <vote-application>
        <div className='text-header'>Application</div>

        <div className={calloutClassError} name='error'>
          <p>{errorMessage}</p>
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

      </vote-application>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    form: state.form
  };
};

const dispatches = {
  submitFormStarted,
  formHasMissingFields,
  postForm
};

export default connect(mapStateToProps, dispatches)(Application);
