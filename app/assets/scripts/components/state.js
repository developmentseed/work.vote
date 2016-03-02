'use strict';

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';
import Box from '../components/box';
import Shape from '../components/shape';
import MoreInfo from '../components/results/info';
import { fetchStateJurisdictions } from '../actions/action';

let State = React.createClass({
  propTypes: {
    state: React.PropTypes.object,
    state_jurisdictions: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      state: {
        id: 0,
        name: '',
        pollworker_website: null,
        is_active: false
      }
    };
  },

  getStateJurisdictions: function (state_id) {
    if (!(state_id in this.props.state_jurisdictions) && this.props.state.is_active) {
      this.props.dispatch(fetchStateJurisdictions(state_id));
    }
  },

  componentDidMount: function () {
    this.getStateJurisdictions(this.props.state.id);
  },

  componentDidUpdate: function () {
    this.getStateJurisdictions(this.props.state.id);
  },

  render: function () {
    let { state_jurisdictions, state } = this.props;
    let list = [];
    let loaded = false;

    if (!_.isUndefined(state_jurisdictions[state.id])) {
      if (state_jurisdictions[state.id].length > 0) {
        let jurs = state_jurisdictions[state.id];
        for (let i in jurs) {
          let obj = jurs[i];
          if (obj.name) {
            list.push(<div className = 'select-link' key={obj.id}><p key={obj.id}><Link to={`/j/${obj.id}`}>{obj.name}</Link></p></div>);
          }
        }
      } else {
        list.push(<div>Nothing found</div>);
      }
    } else if (!state.is_active && state.pollworker_website) {
      list.push(
        <div className='error-text'>While workelections.com does not have information for each jurisdiction in {state.name}, you may refer to the state’s <a href={state.pollworker_website}>online resources.</a> </div>
      );
    }

    if (state.id !== 0 && (list.length > 0)) {
      loaded = true;
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <div className='results-split-container medium-4 columns text-center'>
            <div className='juris-header'>{state.name}</div>
             <div className='county-image'>
              <Shape state_id={state.topojson_id} />
            </div>
            <MoreInfo url={state.pollworker_website} value='State Poll Workers website' />
          </div>

          <div className='results-split-container medium-8 columns'>
            {list}
          </div>

        </Loader>
      </Box>
    );
  }

});

function mapStateToProps (state) {
  return {
    state_jurisdictions: state.state_jurisdictions
  };
}

export default connect(mapStateToProps)(State);
