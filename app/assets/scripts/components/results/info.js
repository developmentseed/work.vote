'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

let Info = React.createClass({
  displayName: 'More info',
  propTypes: {
    value: React.PropTypes.string,
    url: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      value: 'Poll Worker Information',
      url: null
    };
  },

  render: function () {
    if (this.props.url) {
      return (
        <a href={ checkUrl(this.props.url) }><div className='btn info'>{this.props.value}</div></a>
      );
    } else {
      return false;
    }
  }
});

export default Info;
