// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Description from '@material-ui/icons/Description';

const Loading = () => null;

const DashboardContainer = Loadable({
  loader: () => import('../containers/DashboardContainer'),
  loading: Loading,
});

const UsersContainer = Loadable({
  loader: () => import('../containers/UsersContainer'),
  loading: Loading,
});

const PostsContainer = Loadable({
  loader: () => import('../containers/PostsContainer'),
  loading: Loading,
});

export const dashboardIndexRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardContainer,
  },
  {
    path: '/users',
    sidebarName: 'Users',
    navbarName: 'Users',
    icon: Person,
    component: UsersContainer,
  },
  {
    path: '/posts',
    sidebarName: 'Posts',
    navbarName: 'Posts',
    icon: Description,
    component: PostsContainer,
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
