'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

let Apply = React.createClass({
  displayName: 'Apply Now',
  propTypes: {
    value: React.PropTypes.string,
    url: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      url: null
    };
  },

  render: function () {
    if (this.props.url) {
      return (
        <a href={ checkUrl(this.props.url) }><div className='btn'>Apply Now!</div></a>
      );
    } else {
      return false;
    }
  }
});

export default Apply;
