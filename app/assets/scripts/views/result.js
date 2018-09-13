'use strict';

import _ from 'lodash';
import React from 'react';
import Loader from 'react-loader';
import Box from '../components/box';
import Apply from '../components/results/apply';
import Application from '../components/application';
import MoreInfo from '../components/results/info';
import StudentInfo from '../components/results/student';
import Empty from './404';
import Conditional from '../components/results/conditional';
import { Cond, Clause, eq, Default } from 'react-cond';
import { connect } from 'react-redux';

import { fetchJurisdiction } from '../actions/action';

let Result = React.createClass({
  propTypes: {
    jurisdiction: React.PropTypes.object,
    notFound: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  },

  getInitialState: function () {
    return {
      applicationIsShown: false,
      applicaitonIsSubmitted: false
    };
  },

  showApplication: function (event) {
    event.preventDefault();
    this.setState({applicationIsShown: true});
  },

  onSubmit: function () {
    this.setState({
      applicaitonIsSubmitted: true,
      applicationIsShown: false
    });
  },

  componentDidMount: function () {
    this.props.dispatch(fetchJurisdiction(this.props.params.jurisdiction_id));
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.params.jurisdiction_id !== this.props.params.jurisdiction_id) {
      this.props.dispatch(fetchJurisdiction(this.props.params.jurisdiction_id));
    }
  },

  render: function () {
    let { jurisdiction, notFound} = this.props;
    let loaded = false;
    let image = null;
    let secondColumn;
    if (!_.isEmpty(jurisdiction)) {
      loaded = true;
    }

    if (!_.isUndefined(jurisdiction.id)) {
      image = 'https://s3.amazonaws.com/voteworker/jurisdictions/' + jurisdiction.id + '.png';
    }

    if (notFound) {
      return (
        <Empty />
      );
    }

    if (this.state.applicationIsShown) {
      secondColumn = (
          <Application jurisdiction_id={jurisdiction.id} onSubmit={this.onSubmit} />
      );
    } else {
      let message;
      if (this.state.applicaitonIsSubmitted) {
        message = (
          <div className='callout success' >
            <p>Your application was submitted. Thank you!</p>
          </div>
        );
      }
      if (jurisdiction.display == 'Y') {
        secondColumn = (
          <div>
            {message}
            <div className='text-header'>Registration Requirements</div>
            <ul>
              <Cond value={jurisdiction.registration_status}>
                <Clause test={eq('S')}><li><p>You can be registered anywhere in the state to work on Election Day in {jurisdiction.name}.</p></li></Clause>
                <Clause test={eq('J')}><li><p>You must be registered in {jurisdiction.name} to work on Election Day</p></li></Clause>
                <Default><span></span></Default>
              </Cond>

              <Cond value={jurisdiction.pre_registration}>
                <Clause test={eq('Y')}><li><p>You must be pre-registered to vote.</p></li></Clause>
                <Clause test={eq('N')}><li><p>You do not need to be pre-registered to vote.</p></li></Clause>
                <Default><span></span></Default>
              </Cond>
            </ul>

            <div className='text-header'>Hours and Compensation</div>
            <ul>
              <li>
                <Conditional title='Start Time' value={jurisdiction.hours_start} else='N/A' />
              </li>
              <li>
                <Conditional title='End Time' value={jurisdiction.hours_end} else='N/A' />
              </li>
              <li>
                <Conditional title='Compensation Range' value={jurisdiction.compensation} else='N/A' />
              </li>

              <Cond value={jurisdiction.full_day_req}>
                <Clause test={eq('Y')}><li><p>You must work the full day.</p></li></Clause>
                <Clause test={eq('N')}><li><p>You can split the day with another election worker</p></li></Clause>
                <Default><span></span></Default>
              </Cond>
            </ul>

            <div className='text-header'>Work Requirements</div>
            <ul>
              <li>
                <Conditional title='Minimum Age' value={jurisdiction.minimum_age} else='N/A' />
              </li>

              <Cond value={jurisdiction.interview}>
                <Clause test={eq('Y')}><li><p>People who sign up to work on Election Day are interviewed.</p></li></Clause>
                <Clause test={eq('N')}><li><p>There is no interview.</p></li></Clause>
                <Default><Conditional title='Interview:' value={jurisdiction.interview} /></Default>
              </Cond>

              <Cond value={jurisdiction.training}>
                <Clause test={eq('Y')}><li><p>You must attend a training session.</p></li></Clause>
                <Default><span></span></Default>
              </Cond>

              <Cond value={jurisdiction.complete_training}>
                <Clause test={eq('Y')}><li><p>You must complete training for each election.</p></li></Clause>
                <Clause test={eq('N')}><li><p>Once you are trained, you do not need to attend training for each election. The local election official will let you know when new training is required.</p></li></Clause>
                <Default><span></span></Default>
              </Cond>

              <Cond value={jurisdiction.must_have_email}>
                <Clause test={eq('Y')}><li><p>You are required to have an email address and access to a computer and the Internet.</p></li></Clause>
                <Default><span></span></Default>
              </Cond>
            </ul>

            <div className='text-header'>Further Notes</div>
            <p>{jurisdiction.further_notes}</p>
            <Conditional title='Last Updated' value={jurisdiction.obtained_at}/>
            </div>
        );
      }
      else {
        secondColumn = (
          <div>
            {message}
            <p>Workelections.com does not yet have information for this jurisdiction.</p>
          </div>
        );
      }
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <div className='results-split-container medium-5 columns'>
            <div className='juris-header'>{jurisdiction.name}, {jurisdiction.state.alpha}</div>
            <div className='county-image'>
              <img src={image}></img>
            </div>
              <MoreInfo url={jurisdiction.website} /> &nbsp;
              <StudentInfo url={jurisdiction.student_website} />
              <br />
              <Apply url={jurisdiction.application} email={jurisdiction.email} click={this.showApplication} />
              <br/>
            <div className='text-header'>Contact Information</div>
            <Conditional title='Phone' value={jurisdiction.telephone} />
            <Conditional title='Email' value={jurisdiction.email} />
            <Conditional title='Office Address' value={jurisdiction.office_address} else='N/A' />
            <Conditional title='Mailing Address' value={jurisdiction.mailing_address} />
          </div>
          <div className='results-split-container medium-6 columns'>
            {secondColumn}
          </div>
        </Loader>
      </Box>
    );
  }

});

function mapStateToProps (state) {
  // Check if it is state or county

  return {
    jurisdiction: state.jurisdiction.data,
    notFound: state.jurisdiction.notFound
  };
}

export default connect(
  mapStateToProps
)(Result);
