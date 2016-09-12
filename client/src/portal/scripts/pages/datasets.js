import React, { Component, PropTypes } from 'react';


class Datasets extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Datasets;

