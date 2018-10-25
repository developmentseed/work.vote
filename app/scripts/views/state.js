'use strict';

import isUndefined from 'lodash.isundefined';
import find from 'lodash.find';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';
import Box from '../components/box';
import Shape from '../components/shape';
import NotFound from './404';
import MoreInfo from '../components/results/info';
import { fetchStateJurisdictions, fetchStates } from '../actions';
import { getUrlName } from '../utils';

class State extends React.Component {
  getStateId () {
    return this.props.match.params.stateId;
  }

  getStateJurisdictions (stateId) {
    if (!(stateId in this.props.stateJurisdictions)) {
      this.props.fetchStateJurisdictions(stateId);
    }
  }

  componentDidMount () {
    if (this.props.states.length === 0) {
      this.props.fetchStates();
    }
    this.getStateJurisdictions(this.getStateId());
  }

  componentDidUpdate () {
    this.getStateJurisdictions(this.getStateId());
  }

  render () {
    const { stateJurisdictions, states } = this.props;
    const list = [];
    let loaded = false;

    const stateId = this.getStateId();
    const stateObj = find(states, { id: parseInt(stateId) }) || {};

    if (!isUndefined(stateJurisdictions[stateObj.id])) {
      if (stateJurisdictions[stateObj.id].length > 0) {
        const jurs = stateJurisdictions[stateObj.id];
        for (const i in jurs) {
          const obj = jurs[i];
          const urlName = getUrlName(obj.name);
          if (obj.name) {
            list.push(<div className = 'select-link' key={obj.id}><p><Link to={`/j/${obj.id}/${urlName}`}>{obj.name}</Link></p></div>);
          }
        }
      } else {
        list.push(<div className = 'text-center'>We do not yet have information for these jurisdictions.</div>);
      }
    } else if (!stateObj.is_active && stateObj.pollworker_website) {
      list.push(
        <div className='error-text'>While workelections.com does not have information for each jurisdiction in {stateObj.name}, you may refer to the state’s <a href={stateObj.pollworker_website}>online resources.</a> </div>
      );
    } else if (!stateObj.is_active) {
      list.push(
        <div className='error-text'>Sorry, Workelections.com does not have information for each jurisdiction in {stateObj.name}.</div>
      );
    }

    if (stateObj.id) {
      loaded = true;
    }

    if (!stateObj.id && states.length > 0) {
      return (<NotFound />);
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <Helmet>
            <title>Work Elections | {stateObj.name}</title>
          </Helmet>
          <div className='results-split-container medium-4 columns text-center'>
            <div className='juris-header'>{stateObj.name}</div>
            <div className='county-image'>
              <Shape stateId={stateObj.topojson_id} />
            </div>
            <MoreInfo url={stateObj.pollworker_website} value='State Poll Workers website' />
          </div>

          <div className='results-split-container medium-8 columns'>
            {list}
          </div>

        </Loader>
      </Box>
    );
  }
}

function mapStateToProps (state) {
  return {
    stateJurisdictions: state.stateJurisdictions,
    states: state.states
  };
}

const dispatches = {
  fetchStates,
  fetchStateJurisdictions
};

export default connect(mapStateToProps, dispatches)(State);
