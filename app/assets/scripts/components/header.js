import React from 'react';
import { connect } from 'react-redux';


let Header = React.createClass({
  render: function () {
    console.log(this.props);
    return (
      <header>
        <div className='row header-padding'>
          <div className='small-12 small-centered columns text-center white'><h1>Work the Election</h1></div>
        </div>
        <div className='row header-padding'>
          <div className='small-3 columns text-center white'>Country Finder</div>
          <div className='small-3 columns text-center white'>Work Summary</div>
          <div className='small-3 columns text-center white'>Get Involved</div>
          <div className='small-3 columns text-center white'>About</div>
        </div>
      </header>
    );
  },

});

function mapStateToProps (state) {
  return {
    name: state.frontpage.name
  };
}

export default connect(
  mapStateToProps
)(Header);

