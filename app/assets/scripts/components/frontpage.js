let React = require('react');
import { Link } from 'react-router';

let Frontpage = React.createClass({
	render: function () {
		return (
			<div className="row column">
				<img src='/assets/graphics/layout/main.png' width='100%' />
				<div id='User-Locate-container'>
					<div id='Search-container'>
						<div id="Address-Finder">
						findstuff
						</div>
					</div>
				<div id='map'></div>
			</div>
		</div>
		);
	}
});

module.exports = Frontpage;