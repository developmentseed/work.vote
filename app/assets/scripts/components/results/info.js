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
      value: null,
      url: null
    };
  },

  render: function () {
    if (this.props.url) {
      return (
        <p><a href={ checkUrl(this.props.url) }>How to be a poll worker in {this.props.value}</a></p>
      );
    } else {
      return false;
    }
  }
});

export default Info;
