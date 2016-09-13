import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';


let UpdateDashboardForm = (props) => {

  const {
    handleSubmit, pristine, reset, submitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="notes">Notes</label>
        <Field name="notes" component="input" type="text"/>
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <Field name="url" component="input" type="url"/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting} >Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </form>
  )
};

// decorate with reduxForm()
UpdateDashboardForm = reduxForm({
  form: 'updateDashboard'
})(UpdateDashboardForm);

// read the initialValues prop
UpdateDashboardForm = connect(
  (state, ownProps) => ({
    initialValues: ownProps.model
  }),
)(UpdateDashboardForm);

export default UpdateDashboardForm
