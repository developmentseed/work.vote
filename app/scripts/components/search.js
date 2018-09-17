'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { updateInputValue, loadSuggestions, cleanSuggestions } from '../actions';

function getSuggestionValue (suggestion) {
  if (suggestion.type === 'jurisdiction') {
    return `${suggestion.name}, ${suggestion.state_alpha}`;
  }
  return suggestion.name;
}

function renderSuggestion (suggestion) {
  return (
    <span>{getSuggestionValue(suggestion)}</span>
  );
}

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.displayName = 'Search';
    this.onChange = this.onChange.bind(this);
  }

  onChange (event, { newValue }) {
    this.props.updateInputValue(newValue);
  }

  onSuggestionsFetchRequested ({ value }) {
    this.props.loadSuggestions(value);
  }

  onSuggestionsClearRequested () {
    this.props.clearSuggestions();
  }

  render () {
    const { value, suggestions } = this.props.search;
    const inputProps = {
      placeholder: 'type',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <div id='Search-container'>
          <div id='Address-Finder'>
            <div className='search-label'>Enter your state, county, city, zip code or address</div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={(value) => this.onSuggestionsFetchRequested(value)}
              onSuggestionsClearRequested={() => this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
              ref='searchbox' />
          </div>
        </div>
        <div id='Search-enabler'><img src='/assets/graphics/layout/search.png'></img></div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    search: state.search
  };
}

const dispatches = {
  updateInputValue,
  loadSuggestions,
  cleanSuggestions
};

export default connect(mapStateToProps, dispatches)(Search);
