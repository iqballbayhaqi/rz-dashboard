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

const SinglePostContainer = Loadable({
  loader: () => import('../containers/SinglePostContainer'),
  loading: Loading,
});

export const dashboardIndexRoutes = [
  {
    showInNavigation: true,
    path: '/dashboard',
    navbarName: 'Dashboard',
    icon: Dashboard,
    component: DashboardContainer,
  },
  {
    showInNavigation: true,
    path: '/users',
    navbarName: 'Users',
    icon: Person,
    component: UsersContainer,
  },
  {
    showInNavigation: true,
    path: '/posts',
    navbarName: 'Posts',
    icon: Description,
    component: PostsContainer,
  },
  {
    showInNavigation: false,
    path: '/posts/:id',
    navbarName: 'Single Post',
    component: SinglePostContainer,
  },
  {
    showInNavigation: false,
    path: '/posts/new',
    navbarName: 'Add New Post',
    component: SinglePostContainer,
  },
  {
    showInNavigation: false,
    path: '/posts/:id/comments',
    navbarName: 'Single Post Comments',
    component: SinglePostContainer,
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    navbarName: 'Redirect',
  },
];

const DashboardRoutes = () => (
  <Switch>
    {dashboardIndexRoutes.map((prop) => {
      if (prop.redirect) { return <Redirect from={prop.path} to={prop.to} key={prop.navbarName} />; }
      return <Route exact path={prop.path} component={prop.component} key={prop.navbarName} />;
    })}
  </Switch>
);

export default DashboardRoutes;
