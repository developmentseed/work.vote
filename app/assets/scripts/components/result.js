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
      <div className="callout large secondary">
        <div className="row">
          <div className="large-6 columns">
            <h3>{jurisdiction.name} </h3>
            <p>{jurisdiction.office_address} </p>
          </div>
          <div className="large-6 columns">
            <h5>Work Hours:</h5>
            <p>Starts at {jurisdiction.hours_start}</p>
            <p>Ends at {jurisdiction.hours_end}</p>
            <h5>Registration</h5>
            <p><a href="{jurisdiction.website}">Register here</a> or call {jurisdiction.telephone}</p>
            <p>Age requirement</p>
            <p>Rules of the district</p>
            <p>Training</p>
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
