'use strict';

import _ from 'lodash';
import nets from 'nets';
import React from 'react';
import config from '../config';
import classNames from 'classnames';
var Select = require('react-select');

let Survey = React.createClass({

  getInitialState: function () {
    return {
      formError: false,
      submittingForm: false,
      errorMessage: null
    };
  },

  startSurvey: function (event) {
    this.refs.surveyButton.setAttribute('class', 'survey-button animated slideOutRight');
  },

  close: function (ref, event) {
    this.refs[ref].setAttribute('class', 'hide');
  },

  loadPopup: function (element) {
    setTimeout(function () {
      element.setAttribute('class', 'survey-button animated slideInRight');
    }, 500);
  },

  componentDidMount: function () {
    this.loadPopup(this.refs.surveyButton);
  },

  submitForm: function (event) {
    window.scrollTo(0, 0);

    let missingFields = [];
    let requiredFields = [
      'age', 'languages', 'technology'
    ];

    let values = {
      age: parseInt(document.getElementsByName('survey-age')[0].value, 10),
      languages: [],
      technology: parseInt(document.getElementsByName('survey-technology')[0].value, 10)
    };

    let languages = document.getElementsByName('survey-languages')[0].value;
    if (!_.isEmpty(languages)) {
      console.log(languages)
      console.log(languages.length)
      values['languages'] = languages.split(',');
    }

    this.setState({submittingForm: true});

    for (let i in requiredFields) {
      console.log(values[requiredFields[i]]);
      if (_.isNaN(values[requiredFields[i]])) {
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

      if (resp.statusCode === 200) {
        self.setState({
          submittingForm: false,
          formError: false
        });

      } else {
        self.setState({
          submittingForm: false,
          formError: true,
          errorMessage: 'An unexpected error occurred while submitting the form. Please try again!'
        });
        return;
      }
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

    return (<survey>
      <div className='hide' ref='surveyButton' onClick={this.startSurvey}>
        <div className='close' onClick={this.close.bind(null, 'surveyButton')}>x</div>
        Help us build a better website by responding to a quick survey >
      </div>

      <div id='myModal' className='modal' ref='surveyModal'>
        <div className='modal-content'>
          <div className='close' onClick={this.close.bind(null, 'surveyModal')}>x</div>
          <div className='text-header'>Survey</div>
          <div id='survey-form'>

            <div className={calloutClassError} name='error'>
              <p>{this.state.errorMessage}</p>
            </div>

            <label>What is your age?<span className='red'>*</span>
              <Select
                  name='survey-age'
                  options={config.ageOptions}
              />
            </label>

            <label>What languages do you speak other than English?<span className='red'>*</span>
              <Select
                  name='survey-languages'
                  options={config.languageOptions}
                  multi
              />
            </label>

            <label>
              How familiar are you with working with computer technology on a scale of 1 to 10?<span className='red'>*</span>
              <Select
                  name='survey-technology'
                  options={config.technologyOptions}
              />
            </label>

            <div className='btn' onClick={this.submitForm}>Submit</div><span className={submitLabel} name='label'>Sending... Please wait!</span>
            <p><span className='red'>* are required</span></p>
          </div>
        </div>
      </div>
    </survey>);
  }
});

module.exports = Survey;
