import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { saveDashboard } from './../actions/dashboard'


const mapStateToProps = (store, ownProps) => ({
  dashboard: ownProps.dashboard,
  widgets: ownProps.widgets
});
const mapDispatchToProps = dispatch => ({
  submit: bindActionCreators(saveDashboard, dispatch)
});

class DashboardIndex extends Component {

  onSubmit(e) {

  }

  render() {
    let { dashboard, widgets } = this.props;




    const renderField = ({input, label, type, meta: {touched, error} }) => {
      return (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      )
    };

    const SyncValidationForm = (props) => {
      const { handleSubmit, pristine, reset, submitting } = props;
      return (
        <form onSubmit={handleSubmit}>
          <Field name="id" type="text" component={renderField} disabled label="id" />
          <Field name="organisation_id" type="text" disabled component={renderField} label="organisation_id" />
          <Field name="name" type="text" component={renderField} label="name" />
          <Field name="notes" type="text" component={renderField} label="notes" />
          <Field name="url" type="text" component={renderField} label="url" />
          <Field name="display_hero" type="text" component={renderField} label="display_hero" />
          <Field name="display_kpis" type="text" component={renderField} label="display_kpis" />
          <Field name="published_at" type="text" component={renderField} label="published_at" />
          <Field name="created_at" type="text" component={renderField} label="created_at" />
          <Field name="updated_at" type="text" component={renderField} label="updated_at" />
          <div>
            <button type="submit" disabled={submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      )
    };

    return (
      <div>
        <h2>Dashboard: {dashboard.name}</h2>

        <SyncValidationForm handleSubmit={this.onSubmit} />

        {widgets.map((w, idx) => {
          return <li key={idx}><Link to={`/dashboards/${dashboard.id}/widgets/${w.id}`}>{w.name}</Link></li>
        })}
      </div>
    )
  }
}

const validate = () => {
  return true;
};



export default reduxForm({
  form: 'updateDashboard',
  validate
})(connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndex));

