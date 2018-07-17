// @flow
import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Person from '@material-ui/icons/Person';
import Description from '@material-ui/icons/Description';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';

const Loading = () => null;

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

const PhotosContainer = Loadable({
  loader: () => import('../containers/PhotosContainer'),
  loading: Loading,
});

export const dashboardIndexRoutes = [
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
    showInNavigation: true,
    path: '/albums',
    navbarName: 'Albums',
    icon: PhotoLibrary,
    component: AlbumsContainer,
  },
  {
    showInNavigation: false,
    path: '/albums/:id/photos',
    navbarName: 'Photos of Album',
    component: PhotosContainer,
  },
  {
    redirect: true,
    path: '/',
    to: '/users',
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
