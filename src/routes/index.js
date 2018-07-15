// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => null;

const Main = Loadable({
  loader: () => import('../containers/MainContainer'),
  loading: Loading,
});

const NotFound = Loadable({
  loader: () => import('../containers/NotFoundContainer'),
  loading: Loading,
});

const Routes = () => (
  <Switch>
    <Route path="/" component={Main} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
