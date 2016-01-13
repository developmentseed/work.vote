'use strict';

import React from 'react';

let Empty = React.createClass({
  displayName: '404 empty',

  render: function () {
    return (
      <p>This is not the webpage you are looking for!</p>
    );
  }
});

export default Empty;
