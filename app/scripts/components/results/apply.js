'use strict';

import React from 'react';
import ReactGA from 'react-ga';
import { checkUrl } from '../../utils';

class Apply extends React.Component {
  constructor (props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked (event) {
    event.preventDefault();
    const action = {
      category: this.props.category,
      action: 'External Application was clicked!'
    };
    if (this.external) {
      ReactGA.event(action);
      window.location = checkUrl(this.props.url);
    } else {
      action.action = 'Local Application is clicked';
      ReactGA.event(action);
      this.props.click();
    }
  }

  render () {
    if (this.props.email && !this.props.url) {
      this.external = false;
    } else if (this.props.url) {
      this.external = true;
    }

    if (this.external === undefined) {
      return false;
    } else if (this.external) {
      return (
        <a href={ checkUrl(this.props.url) } onClick={this.clicked}><div className='btn'>Apply Now!</div></a>
      );
    } else {
      return (
        <a href='#' onClick={this.clicked}><div className='btn'>Apply Now!</div></a>
      );
    }
  }
}

export default Apply;
