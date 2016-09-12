import React, { Component, PropTypes } from 'react';


class Widgets extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Widgets;

