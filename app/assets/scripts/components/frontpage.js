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
				<div className="banner-text">
					<div className="text-header">Be a part of Democracy</div>
					<p>Find polling stations to work at this upcoming for this and future elections.</p>
					<div className="cbtn">V</div>
				</div>
				<div className="map-break"><a name="map"></a></div>
				<div id='User-Locate-container'>
					<Search />
					<Map />
				</div>
			</div>
		);
	}
});

module.exports = Frontpage;
