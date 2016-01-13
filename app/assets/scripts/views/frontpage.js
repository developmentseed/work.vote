'use strict';

import React from 'react';
import Search from '../components/search';

let Frontpage = React.createClass({
  render: function () {
    return (
			<div className='row column'>
				<div className='welcome-mat'>
					<div className = 'banner-image'></div>
					<div className='banner-box'>
						<div className='banner-text'>
							<div className='text-header'>Be a Part of Democracy</div>
							<p>Look up information on how to work at the polls on Election Day.</p>
						</div>
						<Search />
					</div>
				</div>
				<div id='User-Locate-container'>
				</div>
				<div className='map-break'><a name='map'></a></div>
			</div>
		);
  }
});

module.exports = Frontpage;
