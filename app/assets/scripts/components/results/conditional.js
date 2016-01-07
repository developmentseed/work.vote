'use strict';

import React from 'react';

let Conditional = React.createClass({
  displayName: 'mailing-address',
  propTypes: {
    value: React.PropTypes.string,
    title: React.PropTypes.string,
    else: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      value: null,
      title: null,
      else: null
    };
  },

  render: function () {
    if (this.props.value || this.props.else) {
      let value = this.props.value || this.props.else;

      let title;
      if (this.props.title) {
        title = <b>{this.props.title}:</b>;
      }

      return (
        <p>{title} {value}</p>
      );
    } else {
      return false;
    }
  }
});

export default Conditional;
