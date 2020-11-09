"use strict";

import React from "react";
import Survey from "./survey";

const Footer = () => (
  <footer className='footer-container'>
    <div className='map-break' />
    <div className='map-break-below-2' />
    <div className='callout large secondary'>
      <div className='row'>
        <div className='large-6 columns footer-items footer-msg'>
          <h5>
            Work Elections Compiles Poll Worker Requirements and Applications
          </h5>
          <h5>
            <p>
              This nonpartisan project has collected poll worker information and
              applications for thousands of local jurisdictions across the U.S.,
              making it easy for local election officials and potential workers
              to connect.
            </p>
          </h5>
        </div>
      </div>
    </div>
    <div className='callout large tertiary'>
      <div className='row'>
        <div className='large-6 columns footer-items footer-partners'>
          <h5>This is a project of</h5>
          <a href='https://www.fairelectionscenter.org/'>
            <img
              src='/graphics/meta/FairElectionsCenterLogo.png'
              width='200px'
            />
          </a>
        </div>
      </div>
    </div>
    <div className='footer-bottom'>
      <div className='footer-bottom-content'>
        <p>
          Disclaimer: The site compiles the most up-to-date and accurate
          information directly from local elections officials and/or their
          public information sites. This information is being provided as a
          public service and the sponsoring organizations should not be held
          responsible for any inaccuracies in the information. Work Elections is
          a non-profit and is not affiliated in any way with any governmental
          office or agency.
        </p>
        <div>
          <a href='/p/terms'>Terms of Use</a> | <a href='/p/privacy'>Privacy</a>
        </div>
        <br />
      </div>
    </div>
    <Survey />
  </footer>
);

export default Footer;
