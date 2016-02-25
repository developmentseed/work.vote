'use strict';

import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from 'react-loader';
import Box from '../components/box';
import Map from '../components/map';
import State from '../components/state';
import NotFound from './404';
import { fetchStates } from '../actions/action';

let States = React.createClass({
  propTypes: {
    states: React.PropTypes.array,
    state_jurisdictions: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  },

  getId: function (id) {
    let _id = parseInt(id, 10);

    if (!_.isNaN(_id)) {
      return _id;
    } else {
      return 0;
    }
  },

  componentWillMount: function () {
    if (this.props.states.length === 0) {
      this.props.dispatch(fetchStates());
    }
  },

  render: function () {
    let { states } = this.props;
    let list = [];
    let map = '';
    let header = '';
    let title = 'States';
    let loaded = false;

    if (this.props.params.state_id) {
      let id = this.getId(this.props.params.state_id);
      if (id) {
        let state = _.find(states, {id: id});
        return (<State state={state} />);
      } else {
        return (<NotFound />);
      }
    } else {
      for (let i in states) {
        let obj = states[i];
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

});

function mapStateToProps (state) {
  return {
    states: state.states
  };
}

export default connect(mapStateToProps)(States);
