// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import DashboardIcon from '@material-ui/icons/Dashboard';

const Loading = () => null;

const Dashboard = Loadable({
  loader: () => import('../containers/DashboardContainer'),
  loading: Loading,
});

export const dashboardIndexRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' },
];

const DashboardRoutes = () => (
  <Switch>
    {dashboardIndexRoutes.map((prop) => {
      if (prop.redirect) { return <Redirect from={prop.path} to={prop.to} key={prop.navbarName} />; }
      return <Route path={prop.path} component={prop.component} key={prop.navbarName} />;
    })}
  </Switch>
);

export default DashboardRoutes;
