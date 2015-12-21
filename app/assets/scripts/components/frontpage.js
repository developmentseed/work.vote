let React = require('react');
import { Link } from 'react-router';

let Frontpage = React.createClass({
	render: function () {
		return (
			<div className="row column">
				<div className="banner-image">
				<img src='/assets/graphics/layout/main.jpg' width='100%' />
				</div>
				<div className="map-break"></div>
				<div id='User-Locate-container'>
					<div id='Search-container'>
						<div id="Address-Finder">
							<div className="center-text"></div>
	 						<input type="text" placeholder="find your jursidiction" />
	 						<div className="usemap">Locate via map</div>
						</div>
					</div>
					<div className="User-Locate-return"><img src="/assets/graphics/layout/search.png"></img> search</div>
					<div id='map'></div>
				</div>
			</div>
		);
	}
});

module.exports = Frontpage;