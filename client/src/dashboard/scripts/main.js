import { merge } from 'lodash';
import domready from 'domready';
import { select, selectAll } from 'd3-selection';

import configureStore from './store/configureStore';
import initialState from './store/initialState';

import { createWidgets } from './actions/widgets';
import { createDatasets } from './actions/datasets';
import DashboardsShow from './containers/legacy-dashboards-show';
import DashboardsIndex from './containers/legacy-dashboards-index';


const bootState = merge(initialState, window.__INITIAL_STATE__);

const store = configureStore(bootState);

const DASHBOARDS_INDEX_ROUTE = 'dashboards_index';
const DASHBOARDS_SHOW_ROUTE = 'dashboards_show';


let DashboardsIndexView = new DashboardsIndex(store);
let DashboardsShowView = new DashboardsShow(store);


domready(() => {

  let _widgetsData = [];

  const getRoute = () => {
    return document.body.getAttribute('data-route');
  };

  let currentRoute = getRoute();


  switch (currentRoute) {
    case DASHBOARDS_INDEX_ROUTE:

      selectAll('.kpi-sparkline .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });

      // serialize
      _widgetsData.forEach((w) => {
        w.datasets.forEach((d) => {
          d.widget_id = w.id;
        });
        store.dispatch(createDatasets(w.datasets));
        // delete w.datasets; // todo - shitty old data transformation code needs this
      });
      store.dispatch(createWidgets(_widgetsData));


      new DashboardsIndexView.render(store.getState());

      break;


    case DASHBOARDS_SHOW_ROUTE:

      selectAll('.kpi-sparkline .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });
      selectAll('.bar .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });
      selectAll('.sparkline .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });
      selectAll('.line .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });
      selectAll('.pie .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });
      selectAll('.fact .widget__inner').each(function () {
        _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
      });

      // serialize
      _widgetsData.forEach((w) => {
        w.datasets.forEach((d) => {
          d.widget_id = w.id;
        });
        store.dispatch(createDatasets(w.datasets));
        // delete w.datasets; // todo - shitty old data transformation code needs this
      });
      store.dispatch(createWidgets(_widgetsData));


      new DashboardsShowView.render(store.getState());

      break;
  }

});

