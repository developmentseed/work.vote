'use strict';

// import nets from 'nets';
import React from 'react';
import isEmpty from 'lodash.isempty';
import isNan from 'lodash.isnan';
import keymaster from 'keymaster';
import classNames from 'classnames';
import Select from 'react-select';
import { connect } from 'react-redux';
import config from '../config';
import {
  showSurveyModal,
  hideSurveyModal,
  postSurveyResults,
  submitSuveyStarted,
  surveyHasMissingFields
} from '../actions';

function surveyIsTaken () {
  const re = new RegExp('(?:(?:^|.*;\\s*)' + config.cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$');
  const cookieValue = document.cookie.replace(re, '$1');
  if (cookieValue !== 'true') {
    return false;
  }
  return true;
}

function setSurveyCookie () {
  document.cookie = `${config.cookieName}=true`;
}

class Survey extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      surveyIsTaken: true,
      sliderIn: true
    };

    this.submitForm = this.submitForm.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeSurveyButton = this.closeSurveyButton.bind(this);
  }

  closeModal () {
    setSurveyCookie();
    this.props.hideSurveyModal();
  }

  openModal () {
    this.closeSurveyButton();
    this.props.showSurveyModal();
  }

  closeSurveyButton () {
    setSurveyCookie();
    this.setState((state) => ({
      surveyIsTaken: !state.surveyIsTaken,
      sliderIn: !state.sliderIn
    }));
  }

  openSurveyButton (taken = false) {
    this.setState({
      surveyIsTaken: taken,
      sliderIn: true
    });
  }

  componentDidMount () {
    // shortcut for forcing the survey popup to show
    keymaster('alt+r', () => {
      this.openSurveyButton();
    });

    // if there is no cookie show survey popup after 2s
    setTimeout(() => {
      this.openSurveyButton(surveyIsTaken());
    }, 20000);
  }

  submitForm (event) {
    window.scrollTo(0, 0);

    this.props.submitSuveyStarted();

    const missingFields = [];
    const requiredFields = [
      'age', 'languages', 'technology'
    ];

    const values = {
      age: parseInt(document.getElementsByName('survey-age')[0].value, 10),
      languages: [],
      technology: parseInt(document.getElementsByName('survey-technology')[0].value, 10)
    };

    const languages = document.getElementsByName('survey-languages')[0].value;
    if (!isEmpty(languages)) {
      values['languages'] = languages.split(',');
    }

    for (const i in requiredFields) {
      if (isNan(values[requiredFields[i]])) {
        missingFields.push(requiredFields[i]);
      }
    }

    if (missingFields.length > 0) {
      this.props.surveyHasMissingFields(missingFields.join(', '));
    } else {
      this.props.postSurveyResults(values);
    }
  }

  render () {
    const { survey } = this.props;
    const modalClass = classNames({
      modal: survey.showModal,
      hide: !survey.showModal
    });

    const surveyButtonClass = classNames({
      hide: this.state.surveyIsTaken,
      'survey-button': true,
      animated: true,
      slideInRight: this.state.sliderIn,
      slideOutRight: !this.state.sliderIn
    });

    const calloutClassError = classNames({
      callout: true,
      alert: true,
      hide: !survey.formError
    });

    const submitLabel = classNames({
      warning: true,
      label: true,
      hide: !survey.submittingForm
    });

    return (
      <survey>
        <div className={surveyButtonClass} ref='surveyButton'>
          <div className='close' onClick={this.closeSurveyButton}>x</div>
          <span onClick={this.openModal}>Help us build a better website by responding to a quick survey &rarr;</span>
        </div>

        <div id='myModal' className={modalClass} ref='surveyModal'>
          <div className='modal-content'>
            <div className='close' onClick={this.closeModal}>x</div>
            <div className='text-header'>Survey</div>
            <div id='survey-form'>

              <div className={calloutClassError} name='error'>
                <p>{survey.errorMessage}</p>
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
                  How familiar are you with working with computer technology on a scale of 1 to 5?<span className='red'>*</span>
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
      </survey>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    survey: state.survey
  };
};

const dispatches = {
  showSurveyModal,
  hideSurveyModal,
  postSurveyResults,
  submitSuveyStarted,
  surveyHasMissingFields
};

export default connect(mapStateToProps, dispatches)(Survey);
