import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getWidgetById } from './../../../reducers/widgets';
import { getDashboardById } from './../../../reducers/dashboards';


const mapStateToProps = ({dashboards, widgets}, ownProps) => ({
  widget: getWidgetById(widgets, ownProps.params.widget_id),
  dashboard: getDashboardById(dashboards, ownProps.params.dashboard_id)
});
const mapDispatchToProps = null;

class Widget extends Component {

  render() {
    let { widget, dashboard } = this.props;
    return (
      <div>
        <h2>widget: {widget.name}</h2>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget);

