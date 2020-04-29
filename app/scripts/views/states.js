'use strict';

import isNan from 'lodash.isnan';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';
import Box from '../components/box';
import Map from '../components/map';
import { fetchStates } from '../actions';
import { getUrlName } from '../utils';

class States extends React.Component {
  getId (id) {
    const _id = parseInt(id, 10);

    if (!isNan(_id)) {
      return _id;
    } else {
      return 0;
    }
  }

  getUrlStateName (name) {
    return name.replace(/[^a-zA-Z0-9]+/g, '-');
  }

  componentDidMount () {
    this.props.fetchStates();
  }

  render () {
    const { states } = this.props;
    const list = [];
    let map = '';
    let header = 'sdfsdfsdfsd';
    let title = 'States';
    let loaded = false;

    for (const i in states) {
      const obj = states[i];
      const urlName = getUrlName(states[i].name);
      list.push(<Link to={`/states/${obj.id}/${urlName}`}><div className = 'select-link' key={obj.id}><p key={obj.id}>{obj.name}</p></div></Link>);
    }
    map = <Map data={states} />;

    if (list.length > 0) {
      loaded = true;
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <div className='results-split-container columns'>
            <div className = 'large-12 columns text-header'>{title}</div>
            {header}
            <hr />
            {map}
            <p>Gray states conduct elections via mail and have less of a demand for poll workers. WorkElections.com currently does not have information for jurisdictions in these states.</p>
            <div className = 'state-select'>
              {list}
            </div>
          </div>
        </Loader>
      </Box>
    );
  }
}

function mapStateToProps (state) {
  return {
    states: state.states
  };
}

const dispatches = {
  fetchStates
};

export default connect(mapStateToProps, dispatches)(States);
