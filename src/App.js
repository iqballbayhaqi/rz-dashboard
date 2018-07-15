// @flow
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './globalStyles';
import Routes from './routes';

type Props = {};

class App extends React.Component<Props> {
  componentDidMount() {
    const elem = document.getElementById('startingLoader');
    window.onload = () => {
      if (elem) {
        elem.remove();
      }
    };
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default withStyles(styles)(App);
