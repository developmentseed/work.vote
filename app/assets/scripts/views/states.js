'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import { fetchStates } from '../actions/action';

let States = React.createClass({
  propTypes: {
    states: React.PropTypes.array,
    dispatch: React.PropTypes.func
  },

  componentDidMount: function () {
    if (this.props.states.length === 0) {
      this.props.dispatch(fetchStates());
    }
  },

  render: function () {
    let { states } = this.props;
    let list = [];

    for (let i in states) {
      list.push(<p key={states[i].id}><Link to={`/states/${states[i].id}`}>{states[i].name}</Link></p>);
    }

    // Results HTML
    return (
      <div className='large'>
        <div className='banner-image banner-juris'>
          <img src='./assets/graphics/layout/main_reduced.jpg' width='100%'/>
        </div>
        <div id='results-container'>
          <div className='columns medium-centered'>
            <div className='results-sub-container columns large medium-centered'>
              <div className='results-split-container medium-5 columns'>
              {list}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

function mapStateToProps (state) {
  // Check if it is state or county

  return {
    states: state.states
  };
}

export default connect(mapStateToProps)(States);
