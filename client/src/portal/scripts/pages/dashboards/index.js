import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const mapStateToProps = ({dashboards}) => ({
  dashboards
});

const mapDispatchToProps = dispatch => ({});

class DashboardsIndex extends Component {
  render() {
    let { dashboards } = this.props;
    return (
      <div>
        <h1>Dashboards</h1>
        {dashboards.map((d, idx) => {
          return <li key={idx}><Link to={`/dashboards/${d.id}`}>{d.id} - {d.name}</Link></li>
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardsIndex);
