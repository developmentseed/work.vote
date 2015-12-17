let React = require('react');
import { Link } from 'react-router';

let Frontpage = React.createClass({
  render: function () {
    return (
      <div className="row column">
        <img src='/assets/graphics/layout/main.png' width='100%' />
        <div id='map'></div>
      </div>
    );
  }
});

module.exports = Frontpage;