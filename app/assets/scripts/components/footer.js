let React = require('react');
import { Link } from 'react-router';

let Footer = React.createClass({
  render: function () {
    return (
      <div className="callout large secondary">
        <div className="row">
          <div className="large-4 columns">
            <h5>Vivamus Hendrerit Arcu Sed Erat Molestie</h5>
            <p>Curabitur vulputate, ligula lacinia scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed molestie augue sit.</p>
          </div>
          <div className="large-3 large-offset-2 columns">
            <ul className="menu vertical">
              <li><a href="#">One</a></li>
              <li><a href="#">Two</a></li>
              <li><a href="#">Three</a></li>
              <li><a href="#">Four</a></li>
            </ul>
          </div>
          <div className="large-3 columns">
            <ul className="menu vertical">
              <li><a href="#">One</a></li>
              <li><a href="#">Two</a></li>
              <li><a href="#">Three</a></li>
              <li><a href="#">Four</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
