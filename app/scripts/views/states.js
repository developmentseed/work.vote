'use strict';

import isNan from 'lodash.isnan';
import find from 'lodash.find';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader';
import Box from '../components/box';
import Map from '../components/map';
import NotFound from './404';
import { fetchStates } from '../actions';

class States extends React.Component {
  getId (id) {
    const _id = parseInt(id, 10);

    if (!isNan(_id)) {
      return _id;
    } else {
      return 0;
    }
  }

  componentDidMount () {
    this.props.fetchStates();
  }

  render () {
    const { states, match } = this.props;
    const list = [];
    let map = '';
    let header = '';
    let title = 'States';
    let loaded = false;

    for (const i in states) {
      const obj = states[i];
      list.push(<Link to={`/states/${obj.id}`}><div className = 'select-link' key={obj.id}><p key={obj.id}>{obj.name}</p></div></Link>);
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
}

export default connect(mapStateToProps, dispatches)(States);
