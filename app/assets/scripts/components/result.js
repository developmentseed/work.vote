import React from 'react';
import utils from '../utils';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { fetchJurisdiction, stateChangeToFalse } from '../actions';

let Result = React.createClass({

  componentDidMount: function () {
    this._getJurisdictions(this.props);
  },

  componentWillUpdate: function () {
    if (this.props.stateChange.status) {
      this.props.boundStateChangeToFalse()
      this._getJurisdictions(this.props);
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.stateChange.status == this.props.stateChange.status;
  },

  render: function () {
    let { jurisdiction } = this.props;

    return (
      <div className="large">
        <div className="banner-image">
        <img src='/assets/graphics/layout/main.jpg' width='100%' />
        </div>

        <div id="results-container">
          <div className="columns medium-centered">
            <div className="results-sub-container columns large medium-centered">
              <div className="results-split-container medium-5 columns">
                <div className="juris-header">{jurisdiction.name} Dummy Name, ST</div>
                <div className="county-image">
                  <img src="/assets/graphics/layout/dummyjurs.svg"></img>
                </div>
                <div className="text-header">Contact Information</div>
                <p>If you have questions about working on Election Day contact your county or jurisdiction.</p>
                <p>Telephone: {jurisdiction.phone} (928)-fake-phone</p>
                <p>Example: {jurisdiction.website} www.example.com</p>
                <p>Address: {jurisdiction.office_address} 332 Example Street</p>
                <p><a href="{jurisdiction.website}">Click here</a> for more information on working Election Day in this jurisdiction.</p>
                <p><a href="{jurisdiction.signup">Click here</a> to sign up as an election worker.</p>
              </div>
              <div className="results-split-container medium-6 columns">
                <div className="text-header">Work Hours:</div>
                  <p>You can be registered anywhere in the state to work on Election Day in {jurisdiction.name}.</p>
                  <p>Estimated hours for Election Day: {jurisdiction.starttime} to {jurisdiction.endtime}</p>

                <div className="text-header">Registration:</div>
                  <p>You can be registered anywhere in the state to work on Election Day in {jurisdiction.name}.</p>
                  <p>You must be at least {jurisdiction.age} in order to serve as an election worker.</p>


                  <p>Starts at {jurisdiction.hours_start}</p>
                  <p>Ends at {jurisdiction.hours_end}</p>
                  <h5>Registration</h5>
                  <p><a href="{jurisdiction.website}">Register here</a> or call {jurisdiction.telephone}</p>
                  <p>Age requirement</p>
                  <p>Rules of the district</p>
                  <p>Training</p>
                </div>
                <div className="results-below-container medium-12 columns">
                  <div className="btn">Work the election in your jursidiction!</div>
                  <p><a href="">Return to Jursidiction Selection</a></p>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  },

  _getJurisdictions: function (v) {
    let id = v.params.name;
    let { boundFetchJurisdiction } = v
    utils.fetchJurisditction(id, boundFetchJurisdiction.bind(null));
  }

});

function mapStateToProps (state) {
  return {
    jurisdiction: state.jurisdiction,
    stateChange: state.stateChange
  };
}

function mapDispatchToProps (dispatch) {
  return {
    boundFetchJurisdiction: function (data) {
      dispatch(fetchJurisdiction(data));
    },
    boundStateChangeToFalse: function() {
      dispatch(stateChangeToFalse())
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
