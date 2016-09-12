import React, { Component, PropTypes } from 'react';


class Widget extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Widget;

