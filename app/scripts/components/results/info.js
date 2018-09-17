'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

class Info extends React.Component {
  render () {
    if (this.props.url) {
      return (
        <a href={ checkUrl(this.props.url) }><div className='btn info'>{this.props.value}</div></a>
      );
    } else {
      return false;
    }
  }
};

export default Info;
