let React = require('react');
import { Link } from 'react-router';

let Footer = React.createClass({
  render: function () {
    return (

      <div className="footer-container">
        <div className="map-break"></div>
        <div className="map-break-below-2"></div>
        <div className="callout large secondary">
          <div className="row">
            <div className="large-8 columns large-offset-2 footer-items center-text">
              <h5>Vote Worker has been made possible thanks to</h5>
              <br></br>
              <a href="http://fairelectionsnetwork.com/"><img src="/assets/graphics/meta/feln_space_logo.png" width="200px"></img></a>
              <a href="http://editions.lib.umn.edu/electionacademy/"><img src="/assets/graphics/meta/ElectionAcademy_logo.svg" width="200px"></img></a>
              <a href="http://knightfoundation.org/"><img src="/assets/graphics/meta/knight-logo.svg" width="200px"></img></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </div>
    );
  }
});

module.exports = Footer;
