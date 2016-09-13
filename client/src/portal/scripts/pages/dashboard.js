import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DashboardForm from './../components/forms/dashboard-form';
import { updateDashboard } from './../actions/dashboard';


const mapStateToProps = (store, ownProps) => ({
  dashboard: ownProps.dashboard,
  widgets: ownProps.widgets
});
const mapDispatchToProps = dispatch => ({
  // submit: bindActionCreators(saveDashboard, dispatch)
});

class DashboardIndex extends Component {

  handleSubmit(data, dispatch) {
    dispatch(updateDashboard(this.props.dashboard.id, data));
    return false;
  }

  render() {
    let { dashboard, widgets } = this.props;

    return (
      <div>
        <h2>Dashboard: {dashboard.name}</h2>

        <DashboardForm onSubmit={this.handleSubmit.bind(this)} model={dashboard} />

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

