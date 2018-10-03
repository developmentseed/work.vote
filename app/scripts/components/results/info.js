'use strict';

import React from 'react';
import { checkUrl } from '../../utils';

class Info extends React.Component {
  render () {
    let { url, value } = this.props;
    if (!value) {
      value = 'Poll Worker Information';
    }

    if (url) {
      return (
        <a href={ checkUrl(url) }>
            <div className='btn info'>{value}</div>
            <br />
        </a>
      );
    } else {
      return false;
    }
  }
};

export default Info;
