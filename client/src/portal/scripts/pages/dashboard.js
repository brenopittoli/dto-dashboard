import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';


const mapStateToProps = (store, ownProps) => ({
  dashboard: ownProps.dashboard,
  widgets: ownProps.widgets
});
const mapDispatchToProps = dispatch => ({});

class DashboardIndex extends Component {

  render() {
    let { dashboard, widgets } = this.props;
    return (
      <div>
        <h2>Dashboard: {dashboard.name}</h2>

        // todo - dashboard
        <form>
        </form>


        {widgets.map((w, idx) => {
          return <li key={idx}><Link to={`/dashboards/${dashboard.id}/widgets/${w.id}`}>{w.name}</Link></li>
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndex);

