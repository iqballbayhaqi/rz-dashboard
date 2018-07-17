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

const SingleCommentContainer = Loadable({
  loader: () => import('../containers/SingleCommentContainer'),
  loading: Loading,
});

const AlbumsContainer = Loadable({
  loader: () => import('../containers/AlbumsContainer'),
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
    showInNavigation: false,
    path: '/users/:id/posts',
    navbarName: 'Posts of User',
    component: PostsContainer,
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
    showInNavigation: false,
    path: '/comments/:id',
    navbarName: 'Single Comment',
    component: SingleCommentContainer,
  },
  {
    showInNavigation: false,
    path: '/comments/new/posts/:postId',
    navbarName: 'Add New Comment',
    component: SingleCommentContainer,
  },
  {
    showInNavigation: false,
    path: '/users/:id/albums',
    navbarName: 'Albums of User',
    component: AlbumsContainer,
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
