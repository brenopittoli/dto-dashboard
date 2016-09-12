import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getDatasetById } from './../reducers/datasets';


const mapStateToProps = ({datasets}, ownProps) => ({
  dataset: ownProps.dataset
});
const mapDispatchToProps = dispatch => ({});

class DatasetIndex extends Component {
  render() {
    let { dataset } = this.props;
    return (
      <div>
        <h1>Dataset: {dataset.name}</h1>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetIndex);
