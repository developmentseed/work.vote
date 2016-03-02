'use strict';

import React from 'react';
import Box from '../components/box';

let About = React.createClass({
  render: function () {
    return (
      <Box>
        <div className='results-split-container medium-12 columns'>
        <div className="text-header">About</div>
        <hr />
        <p>Many local election officials struggle to recruit the hundreds of thousands of poll workers needed nationwide on Election Day. Though county and municipal clerks and boards of election want poll workers with the skills to match voting in 21st Century America, they struggle to recruit sufficient numbers of volunteers with the necessary technological and language skills because they lack a streamlined way to share information on what serving as a poll worker entails, what specific needs they have and how to sign up.</p>

        <p>Work Elections offers a solution to one of the main obstacles to poll worker recruitment: a lack of information and access for a representative and qualified population. Typically, local election officials rely on their limited online presence, the media and community events, and often end up relying on their existing volunteer pool rather than recruiting younger, more multilingual and computer-proficient candidates.</p>

        <p>The project will facilitate a national campaign to focus attention on the value of improving election administration by broadening and diversifying the pool of poll workers. In doing so, we hope to address the thousands of votes lost and hours wasted in line due to an Election Day workforce that struggles to keep pace with technology, language challenges and an increasingly diverse electorate. A new generation of Election Day volunteers can ensure that the adoption of new technology does not undermine the efficiency of casting a ballot and that language minority communities receive the assistance they need.</p>

        <p>More broadly the project will offer new approaches for local governments to recruit citizen volunteers. These tools may be applied to other areas of civic engagement and local volunteerism.</p>

        <p>This tool collects and centralizes information on poll worker requirements and applications for seven states’ local election jurisdictions (Arizona, California, Florida, Nevada, New Mexico, Ohio and Virginia) and also includes a handful of statewide applications for other states. We hope to add poll worker information and applications for all 50 states in the future.</p>

        <p>Work Elections was developed with funding from the Knight Foundation’s Knight Prototype Fund.</p>
        </div>
      </Box>
		);
  }
});

module.exports = About;
