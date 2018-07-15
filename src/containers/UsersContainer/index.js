// @flow
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

type Props = {
  classes: Object,
};

const styles = {
  root: {},
};

class UsersContainer extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Hello World Users
      </div>
    );
  }
}

export default withStyles(styles)(UsersContainer);
