// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => null;

const MainContainer = Loadable({
  loader: () => import('../containers/MainContainer'),
  loading: Loading,
});

const NotFoundContainer = Loadable({
  loader: () => import('../containers/NotFoundContainer'),
  loading: Loading,
});

const Routes = () => (
  <Switch>
    <Route path="/" component={MainContainer} />
    <Route path="*" component={NotFoundContainer} />
  </Switch>
);

export default Routes;
