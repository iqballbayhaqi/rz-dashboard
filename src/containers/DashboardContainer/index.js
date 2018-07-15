// @flow
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

type Props = {
  classes: Object,
};

const styles = {
  root: {},
};

class DashboardContainer extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Hello World
      </div>
    );
  }
}

export default withStyles(styles)(DashboardContainer);
