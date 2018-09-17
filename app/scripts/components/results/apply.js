'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

class Apply extends React.Component {
  render () {
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
}

export default Apply;
