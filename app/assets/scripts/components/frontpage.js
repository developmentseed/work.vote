import React from 'react';
import Map from './map'
import Search from './search';

let Frontpage = React.createClass({
	render: function () {
		return (
			<div className="row column">
				<div className="banner-image">
					<img src='/assets/graphics/layout/main.jpg' width='100%' />
				</div>
				<div className="map-break"></div>
				<div id='User-Locate-container'>
					<Search />
					<Map />
				</div>
			</div>
		);
	}
});

module.exports = Frontpage;
