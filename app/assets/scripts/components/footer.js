'use strict';

import React from 'react';

let Footer = React.createClass({
  render: function () {
    return (

      <div className='footer-container'>
        <div className='map-break'></div>
        <div className='map-break-below-2'></div>
        <div className='callout large secondary'>
          <div className = "footer-items">
            <h5>Work Elections Compiles Poll Worker Requirements and Applications</h5>
            <h5><p>This nonpartisan project has collected poll worker information and applications for hundreds of counties and jurisdictions, making it easy for local election officials and potential workers to connect.</p></h5>
            <h5><p>The code behind this website can be viewed on <a href="https://github.com/developmentseed/work.vote">Github</a>, and the API supporting it can be viewed <a href="api.workelections.com">here</a>.</p></h5>
          </div>

          <div className = "footer-partners center-text">
              <h5>This project is led by the following partners:</h5>
              <a href='http://fairelectionsnetwork.com/'><img src='./assets/graphics/meta/feln_space_logo.png' width='200px'></img></a>
              <a href='http://editions.lib.umn.edu/electionacademy/'><img src='./assets/graphics/meta/ElectionAcademy_logo.svg' width='200px'></img></a>
              <a href=""><img src="./assets/graphics/meta/logo_horizontal_white.png" width='200px'></img></a>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className ='footer-bottom-content'>
            <p>Disclaimer:  The site compiles the most up-to-date and accurate information directly from local elections officials and/or their public information sites. This information is being provided as a public service and the sponsoring organizations should not be held responsible for any inaccuracies in the information. Work Elections is a non-profit and is not affiliated in any way with any governmental office or agency.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
