import React, { Component, PropTypes } from 'react';


class Dashboards extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default Dashboards;
