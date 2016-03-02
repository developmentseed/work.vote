'use strict';

import _ from 'lodash';
import React from 'react';
import Empty from './404';
import Loader from 'react-loader';
import Box from '../components/box';
import { connect } from 'react-redux';

import { fetchPage } from '../actions/action';

let Page = React.createClass({
  propTypes: {
    pages: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      pages: {}
    };
  },

  getPage: function (slug) {
    if (!(slug in this.props.pages)) {
      this.props.dispatch(fetchPage(slug));
    }
  },

  createMarkup: function (content) {
    return {
      __html: content
    };
  },

  componentDidMount: function () {
    this.getPage(this.props.params.slug);
  },

  componentDidUpdate: function () {
    this.getPage(this.props.params.slug);
  },

  render: function () {
    let { pages } = this.props;
    let { slug } = this.props.params;
    let loaded = false;

    let body = null;
    let title = null;
    let notFound = false;

    if (!_.isUndefined(pages[slug])) {
      loaded = true;
      notFound = pages[slug].notFound;
      body = pages[slug].content;
      title = pages[slug].title;
    }

    if (notFound) {
      return (
        <Empty />
      );
    }

    // Results HTML
    return (
      <Box>
        <Loader loaded={loaded}>
          <div className='results-split-container medium-12 columns'>
          <div className='text-header'>{title}</div>
          <hr />
          <div dangerouslySetInnerHTML={this.createMarkup(body)} />
          </div>
        </Loader>
      </Box>
    );
  }

});

function mapStateToProps (state) {
  // Check if it is state or county

  return {
    pages: state.pages
  };
}

export default connect(
  mapStateToProps
)(Page);
