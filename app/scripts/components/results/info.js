'use strict';

import React from 'react';
import ReactGA from 'react-ga';
import { checkUrl } from '../../utils';

class Info extends React.Component {
  constructor (props) {
    super(props);
    this.value = this.props.value;
    if (!this.value) {
      this.value = 'Poll Worker Information';
    }
  }

  clicked (event) {
    event.preventDefault();
    ReactGA.event({
      category: this.props.category,
      action: this.value
    });
    window.location = checkUrl(this.props.url);
  }

  render () {
    let { url } = this.props;
    if (url) {
      return (
        <a href={ checkUrl(url) } onClick={ (event) => this.clicked(event) }>
          <div className='btn info'>{this.value}</div>
          <br />
        </a>
      );
    } else {
      return false;
    }
  }
}

export default Info;
