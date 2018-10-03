'use strict';

import isUndefined from 'lodash.isundefined';
import React from 'react';
import Empty from './404';
import Loader from 'react-loader';
import Box from '../components/box';
import { connect } from 'react-redux';

import { fetchPage } from '../actions';

class Page extends React.Component {
  getPage (slug) {
    if (!(slug in this.props.pages)) {
      this.props.fetchPage(slug);
    }
  }

  createMarkup (content) {
    return {
      __html: content
    };
  }

  componentDidMount () {
    this.getPage(this.props.match.params.slug);
  }

  componentDidUpdate () {
    this.getPage(this.props.match.params.slug);
  }

  render () {
    const { pages } = this.props;
    const { slug } = this.props.match.params;
    let loaded = false;

    let body = null;
    let title = null;
    let notFound = false;
    const page = pages[slug];

    if (!isUndefined(page)) {
      loaded = true;
      notFound = page.notFound;
      body = page.content;
      title = page.title;
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
}

function mapStateToProps (state) {
  return {
    pages: state.pages
  };
}

export default connect(
  mapStateToProps,
  { fetchPage }
)(Page);
