import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute } from 'react-router';

import Layout from './layout';

import Dashboard from './../pages/dashboard';
import Dashboards from './../pages/dashboards';
import Widgets from './../pages/widgets';
import Widget from './../pages/widget';
import Datasets from './../pages/datasets';
import Dataset from './../pages/dataset';

import DashboardsIndex from './../pages/dashboards/index';
import DashboardIndex from './../pages/dashboard/index';
import DashboardWidgetIndex from './../pages/dashboard/widget/index';
import DatasetIndex from './../pages/dataset/index';

import NoMatch from './../pages/no-match';


export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object
  };

  render() {
    let { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>

            <IndexRedirect to="dashboards" />

            <Route path="dashboards" component={Dashboards}>
              <IndexRoute component={DashboardsIndex} />
              <Route path=":dashboard_id" component={Dashboard}>
                <IndexRoute component={DashboardIndex} />
                <Route path="widgets" component={Widgets}>
                  <Route path=":widget_id" component={Widget}>
                    <IndexRoute component={DashboardWidgetIndex} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="datasets" component={Datasets}>
              <Route path=":dataset_id" component={Dataset}>
                <IndexRoute component={DatasetIndex} />
              </Route>
            </Route>

            <Route path="*" component={NoMatch} />

          </Route>
        </Router>
      </Provider>
    )
  }
};

