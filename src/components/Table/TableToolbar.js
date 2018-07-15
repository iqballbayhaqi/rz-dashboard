// @flow
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type Props = {
  classes: Object,
  title?: string,
};

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class TableToolbar extends React.PureComponent<Props> {
  static defaultProps = {
    title: '',
  }

  render() {
    const { classes, title } = this.props;

    return (
      <Toolbar
        className={classes.root}
      >
        <div className={classes.title}>
          <Typography variant="title">
            {title}
          </Typography>
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(TableToolbar);
