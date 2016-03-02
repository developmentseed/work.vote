'use strict';

import _ from 'lodash';
import nets from 'nets';
import React from 'react';
import config from '../config';
import keymaster from 'keymaster';
import classNames from 'classnames';
var Select = require('react-select');

let Survey = React.createClass({

  counter: 0,
  cookieVariable: 'workelections_com_seen_survey',

  getInitialState: function () {
    return {
      formError: false,
      submittingForm: false,
      errorMessage: null,
      showModal: false,
      showSurveyButton: false
    };
  },

  startSurvey: function (event) {
    this.setState({
      showSurveyButton: false,
      showModal: true
    });
  },

  noMoreSurvey: function () {
    document.cookie = this.cookieVariable + '=true';
  },

  closeModal: function () {
    this.noMoreSurvey();
    this.setState({
      showModal: false
    });
  },

  closeSurveyButton: function () {
    this.noMoreSurvey();
    this.setState({
      showSurveyButton: false
    });
  },

  loadSurveyButton: function () {
    this.counter++;
    this.setState({
      showSurveyButton: true,
      showModal: false
    });
  },

  componentDidMount: function () {
    let self = this;

    // shortcut for forcing the survey popup to show
    keymaster('ctrl+r', function () {
      self.loadSurveyButton();
    });

    setTimeout(function () {
      let re = new RegExp('(?:(?:^|.*;\\s*)' + self.cookieVariable + '\\s*\\=\\s*([^;]*).*$)|^.*$');
      var cookieValue = document.cookie.replace(re, '$1');
      if (cookieValue !== 'true') {
        self.loadSurveyButton();
      }
    }, 20000);
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
      values['languages'] = languages.split(',');
    }

    this.setState({submittingForm: true});

    for (let i in requiredFields) {
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
          formError: false,
          showModal: false
        });

        self.noMoreSurvey();
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
    let modalClass = classNames({
      modal: this.state.showModal,
      hide: !this.state.showModal
    });

    let surveyButtonClass = classNames({
      hide: this.counter === 0,
      'survey-button': true,
      animated: true,
      slideInRight: this.state.showSurveyButton,
      slideOutRight: !this.state.showSurveyButton
    });

    let calloutClassError = classNames({
      callout: true,
      alert: true,
      hide: !this.state.formError
    });

    let submitLabel = classNames({
      warning: true,
      label: true,
      hide: !this.state.submittingForm
    });

    return (<survey>
      <div className={surveyButtonClass} ref='surveyButton'>
        <div className='close' onClick={this.closeSurveyButton}>x</div>
        <span onClick={this.startSurvey}>Help us build a better website by responding to a quick survey &rarr;</span>
      </div>

      <div id='myModal' className={modalClass} ref='surveyModal'>
        <div className='modal-content'>
          <div className='close' onClick={this.closeModal}>x</div>
          <div className='text-header'>Survey</div>
          <div id='survey-form'>

            <div className={calloutClassError} name='error'>
              <p>{this.state.errorMessage}</p>
            </div>

            <label>
              <div className='Survey-Q'>
                What is your age?<span className='red'>*</span>
              </div>
              <Select
                  name='survey-age'
                  options={config.ageOptions}
              />
            </label>

            <label>
              <div className='Survey-Q'>
                What languages do you speak other than English?<span className='red'>*</span>
              </div>
              <Select
                  name='survey-languages'
                  options={config.languageOptions}
                  multi
              />
            </label>

            <label>
              <div className='Survey-Q'>
                How familiar are you with working with computer technology on a scale of 1 to 10?<span className='red'>*</span>
              </div>
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
