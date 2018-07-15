// @flow
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  defaultFont,
  container,
  primaryColor,
} from '../../theme';

type Props = {
  classes: Object,
};

const styles = {
  left: {
    padding: '5px 0',
    margin: '0',
    fontSize: '14px',
  },
  footer: {
    bottom: '0',
    borderTop: '1px solid #e7e7e7',
    padding: '15px 0',
    ...defaultFont,
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: 'none',
    backgroundColor: 'transparent',
  },
};

class Footer extends React.PureComponent<Props> {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <p className={classes.left}>
            <span>
              <a href="https://rizalibnu.com" className={classes.a}>
                Rizal Ibnu
              </a>
            </span>
          </p>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
