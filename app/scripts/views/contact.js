'use strict';

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Box from '../components/box';
import {
  formHasMissingFields,
  submitFormStarted,
  postForm
} from '../actions';

class Contact extends React.Component {
  constructor (props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm (event) {
    this.props.submitFormStarted();
    document.getElementById('submitbutton').disabled = true

    const contact = {
      name: document.getElementsByName('name')[0].value,
      email: document.getElementsByName('email')[0].value,
      comment: document.getElementsByName('comment')[0].value
    };

    if (contact.email === '') {
      return this.props.formHasMissingFields(['email']);
    }

    return this.props.postForm('/contacts/us/', contact);
  }

  render () {
    const { formError, errorMessage, submittingForm, formSubmitted } = this.props.form;
    const calloutClassSuccess = classNames({
      'callout': true,
      'success': true,
      'hide': !formSubmitted
    });

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
      <Box>
        <div className='results-split-container'>
          <div className='large-12 columns text-header'>Contact Form</div>
          <hr />

          <div className={calloutClassSuccess} >
            <p>Your message was sent. Thank you!</p>
          </div>

          <div className={calloutClassError} ref='error'>
            <p>{ errorMessage }</p>
          </div>

          <div className='large-6 medium-6 columns'>
            <div id='contact-form'>
              <div className='contact-questions'>Name </div>
              <input className='form__control' type='text' placeholder='First and Last Name' name='name' />
              <div className='large-12 columns contact-questions'>Email <span className='red'>*</span></div>
              <input className='form__control' type='text' placeholder='Email' name='email' />
              <div className='large-12 columns contact-questions'>Comment or Questions</div>
              <textarea className='form__control' type='text' placeholder='Type Here' name='comment' />
              <button id="submitbutton" className='btn' type="button" onClick={this.submitForm}>Submit</button>
              <br />
              <span className={submitLabel} ref='label'>Sending... Please wait!</span>
            </div>
          </div>
          <hr />	
          <strong><p>Press inquiries:</p></strong>	
          <p>Please email Rich Robinson, Fair Election Center's Communications Director, at <a href="mailto:rrobinson@fairelectionscenter.org">rrobinson@fairelectionscenter.org</a> .</p>
        </div>
      </Box>
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

export default connect(mapStateToProps, dispatches)(Contact);
