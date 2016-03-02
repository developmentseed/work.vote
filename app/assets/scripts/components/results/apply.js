'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

let Apply = React.createClass({
  displayName: 'Apply Now',
  propTypes: {
    url: React.PropTypes.string,
    email: React.PropTypes.string,
    click: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      url: null,
      email: null,
      click: function (e) {e.preventDefault();}
    };
  },

  render: function () {
    if (this.props.email && !this.props.url) {
      return (
        <a href='#' onClick={this.props.click}><div className='btn'>Apply Now!</div></a>
      );
    } else if (this.props.url) {
      return (
        <a href={ checkUrl(this.props.url) }><div className='btn'>Apply Now!</div></a>
      );
    } else {
      return false;
    }
  }
});

export default Apply;
