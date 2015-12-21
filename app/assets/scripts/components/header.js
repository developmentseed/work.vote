import React from 'react';
import { connect } from 'react-redux';


let Header = React.createClass({
  render: function () {
    console.log(this.props);
    return (
      <header>
        <div className='header-block'></div>
        <div className='header-tinyblock'></div>
        <div className='header-title white'>
                <img src="/assets/graphics/layout/us.svg"> Work the Election</img>
        </div>
        <div className='header-links'>
          <div className='row header-padding'>
            <a href="" className='white'>Country Finder</a>
            <a href="" className='white'>Get Involved</a>
            <a href="" className='white'>About</a>
          </div>
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

