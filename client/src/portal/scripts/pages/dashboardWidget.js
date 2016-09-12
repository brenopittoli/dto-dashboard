import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getWidgetById } from './../reducers/widgets';
import { getDashboardById } from './../reducers/dashboards';


const mapStateToProps = ({dashboards, widgets}, ownProps) => ({
  widget: getWidgetById(ownProps.widgets, ownProps.params.widget_id),
  dashboard: ownProps.dashboard
});
const mapDispatchToProps = dispatch => ({});

class Widget extends Component {

  render() {
    let { widget, dashboard } = this.props;
    return (
      <div>
        <h2>dashboard: {dashboard.name}</h2>
        <h2>widget: {widget.name}</h2>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Widget);

