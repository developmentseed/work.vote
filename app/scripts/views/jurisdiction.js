'use strict';

import isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';
import { Choose, When, Otherwise } from 'react-conditioner';
import Box from '../components/box';
import Apply from '../components/results/apply';
import Application from '../components/application';
import MoreInfo from '../components/results/info';
import Empty from './404';
import Conditional from '../components/results/conditional';
import { fetchJurisdiction } from '../actions';
import { shape, getUrlName} from '../utils';

class Jurisdiction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      applicationIsShown: false,
      applicaitonIsSubmitted: false
    };

    this.shapeId = 'jurisdictionShape';
    this.showApplication = this.showApplication.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getJurisdictionId () {
    return this.props.match.params.jurisdictionId;
  }

  showApplication () {
    this.setState({ applicationIsShown: true });
  }

  onSubmit () {
    this.setState({
      applicationIsSubmitted: true,
      applicationIsShown: false
    });
  }

  componentDidMount () {
    this.props.fetchJurisdiction(this.getJurisdictionId());
  }

  componentDidUpdate (prevProps) {
    const oldId = prevProps.match.params.jurisdictionId;
    const newId = this.getJurisdictionId();
    if (oldId !== newId) {
      this.props.fetchJurisdiction(newId);
    }

    const { jurisdiction } = this.props;

    if (jurisdiction.geometry) {
      shape(document.getElementById(this.shapeId), jurisdiction.geometry);
    }
  }

  render () {
    const { jurisdiction, notFound } = this.props;
    let loaded = false;
    let secondColumn;

    if (!isEmpty(jurisdiction)) {
      loaded = true;
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
      if (this.state.applicationIsSubmitted) {
        message = (
          <div className='callout success' >
            <p>Your email was submitted. Please direct any follow-up messages to your jurisdiction's election officials. Thank you!</p>
          </div>
        );
      }
      if (jurisdiction.display === 'Y') {
        secondColumn = (
          <div>
            {message}
            <div className='text-header'>Voter Registration Requirements</div>
            <ul>
              <Choose>
                <When condition={ jurisdiction.registration_status === 'S' }>
                  <li><p>You can be registered to vote anywhere in the state to work on Election Day in {jurisdiction.name}.</p></li>
                </When>
                <When condition={ jurisdiction.registration_status === 'J' }>
                  <li><p>You must be registered to vote in {jurisdiction.name} to work on Election Day</p></li>
                </When>
                <Otherwise>
                  <span></span>
                </Otherwise>
              </Choose>
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
                <Conditional title='Compensation' value={jurisdiction.compensation} else='N/A' />
              </li>
              <Choose>
                <When condition={ jurisdiction.full_day_req === 'Y' }>
                  <li><p>You must work the full day.</p></li>
                </When>
                <When condition={ jurisdiction.full_day_req === 'N' }>
                  <li><p>You can split the day with another election worker</p></li>
                </When>
                <Otherwise>
                  <span></span>
                </Otherwise>
              </Choose>
            </ul>

            <div className='text-header'>Work Requirements</div>
            <ul>
              <li>
                <Conditional title='Minimum Age' value={jurisdiction.minimum_age} else='N/A' />
              </li>

              <Choose>
                <When condition={ jurisdiction.training === 'Y' }>
                  <li><p>You must attend a training session.</p></li>
                </When>
                <Otherwise>
                  <span></span>
                </Otherwise>
              </Choose>
              <Choose>
                <When condition={ jurisdiction.complete_training === 'Y' }>
                  <li><p>You must complete training for each election.</p></li>
                </When>
                <When condition={ jurisdiction.complete_training === 'N' }>
                  <li><p>Once you are trained, you do not need to attend training for each election. The local election official will let you know when new training is required.</p></li>
                </When>
                <Otherwise>
                  <span></span>
                </Otherwise>
              </Choose>
              <Choose>
                <When condition={ jurisdiction.training_note }>
                  <li><p><b>Training Details: </b>{jurisdiction.training_note}</p></li>
                </When>
                <Otherwise><span /></Otherwise>
              </Choose>
            </ul>

            <div className='text-header'>Further Notes</div>
            <p>{jurisdiction.further_notes}</p>
          </div>
        );
      } else {
        secondColumn = (
          <div>
            {message}
            <p>Workelections.com does not yet have information for this jurisdiction. Please contact your local election official for more information about being a poll worker in this area.</p>
          </div>
        );
      }
    }

    let pageTitle = '';
    let category = '';
    if (jurisdiction.name) {
      pageTitle = `${jurisdiction.name}, ${jurisdiction.state.alpha}`;
      category = `${jurisdiction.state.alpha} - ${jurisdiction.name}`;
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <Helmet>
            <title>{pageTitle}</title>
          </Helmet>
          <div className='results-split-container medium-5 columns'>
            <div className='juris-header'>{pageTitle}</div>
            {jurisdiction.jurisdiction_link
              ? <sub> {jurisdiction.jurisdiction_link_text} <Link to={`/j/${jurisdiction.jurisdiction_link.id}/${getUrlName(jurisdiction.jurisdiction_link.name)}`}>click here.</Link></sub>
              : null}
            <div className='county-image'>
              <div id={this.shapeId} className='state-shape'></div>
            </div>
            <MoreInfo url={jurisdiction.website} category={`${category} - moreinfo`} />
            <MoreInfo url={jurisdiction.student_website} value="Student Poll Worker Information" category={`${category} - studentinfo`} />
            <Apply url={jurisdiction.application} email={jurisdiction.email} click={this.showApplication} category={`${category} - application`} />
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
}

function mapStateToProps (state) {
  return {
    jurisdiction: state.jurisdiction.data,
    notFound: state.jurisdiction.notFound
  };
}

export default connect(
  mapStateToProps,
  { fetchJurisdiction }
)(Jurisdiction);
