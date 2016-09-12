import React, { Component, PropTypes } from 'react';


class Dataset extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Dataset;

