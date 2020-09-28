'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { fetchStates } from '../actions';
import Select from 'react-select';
import Search from '../components/search';

const selectStyles = {
  control: ({ isFocused, ...base }) => ({
    ...base,
    backgroundClip: 'padding-box',
    borderColor: 'rgba(0,0,0,0.1)',
    boxShadow: '0 2px 5px 0px rgba(0,0,0,0.75)',

    ':hover': {
      borderColor: 'rgba(0,0,0,0.2)'
    }
  }),
  option: base => ({
    ...base,
    padding: '4px 12px'
  }),
  menu: base => ({
    ...base,
    zIndex: 99
  }),
  placeholder: base => ({
    ...base,
    color: '#666'
  })
};

class Frontpage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedState: null,
      previousSelection: null
    };

    this.onSelectedState = this.onSelectedState.bind(this);
  }

  componentDidMount () {
    this.props.fetchStates();
  }

  onSelectedState (option) {
    const { states } = this.props;
    const stateValue = states.find(state => state.alpha === option.value);
    this.setState({
      selectedState: stateValue,
      previousSelection: stateValue
    });
  }

  render () {
    let options = [];

    if (this.props.states && this.props.states.length > 0) {
      options = this.props.states.map(state => {
        return { value: state.alpha, label: `${state.name} ${state.all_mail_elections ? "(All Mail Elections)" : ""}`, isDisabled: state.all_mail_elections };
      });
    }

    return (
      <div className='row column'>
        <div className='welcome-mat'>
          <div className='banner-image'></div>
          <div className='banner-box'>
            <div className='banner-text'>
              <div className='text-header'>Be a Part of Democracy</div>
              <p><span>Look up information on how to work </span> <br /> <span>at the polls on Election Day.</span></p>
            </div>
            <Select
              styles={selectStyles}
              onChange={this.onSelectedState}
              isSearchable={true}
              name="state-selector"
              options={options}
              placeholder="Select a state"
            />
            {
              this.state.selectedState
                ? <Search state={this.state.selectedState}/>
                : <div/>
            }

          </div>
        </div>
        <div id='User-Locate-container'>
        </div>
        <div className='map-break'><a name='map'></a></div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    states: state.states
  };
}

const dispatches = {
  fetchStates
};

export default connect(mapStateToProps, dispatches)(Frontpage);
