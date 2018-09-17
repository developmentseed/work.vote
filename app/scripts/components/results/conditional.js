'use strict';

import React from 'react';

class Conditional extends React.Component {
  render () {
    if (this.props.value || this.props.else) {
      const value = this.props.value || this.props.else;

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
}

export default Conditional;
