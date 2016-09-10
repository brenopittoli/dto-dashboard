import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getDashboardById } from './../reducers/dashboards'


const mapStateToProps = ({dashboards}, ownProps) => ({
  dashboard: getDashboardById(dashboards, ownProps.params.id)
});

const mapDispatchToProps = dispatch => ({
  // onSubmit: dispatch(filtersDataReady(data))
});

class Dashboard extends Component {

  render() {
    let { dashboard } = this.props;
    return (
      <div>
        <h1>{dashboard.title}</h1>
        <p>Form goes here</p>

        <Link to="/dashboards">Back to dashboards</Link>
      </div>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
