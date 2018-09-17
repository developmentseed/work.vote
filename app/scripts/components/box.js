'use strict';

import React from 'react';

class Box extends React.Component {
  render () {
    return (
      <div className='large'>
        <div id='results-container'>
          <div className='columns medium-centered'>
            <br />
            <div className='results-sub-container columns large medium-centered row'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;
