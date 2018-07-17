// @flow
import * as React from 'react';
import classNames from 'classnames';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';

import {
  container,
  defaultFont,
} from '../../theme';

type Props = {
  classes: Object,
  color: string,
  handleDrawerToggle: Function,
  // location: Object,
  // routes: Object,
  // match: Object,
};

const styles = {
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: '0',
    marginBottom: '0',
    position: 'absolute',
    width: '100%',
    paddingTop: '10px',
    zIndex: '1029',
    color: '#555555',
    border: '0',
    borderRadius: '3px',
    padding: '10px 0',
    transition: 'all 150ms ease 0s',
    minHeight: '50px',
    display: 'block',
  },
  container: {
    ...container,
    minHeight: '50px',
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    '&:hover,&:focus': {
      background: 'transparent',
    },
  },
  appResponsive: {
    top: '8px',
  },
};

class Header extends React.PureComponent<Props> {
  // getTitle = () => {
  //   const { routes, location, match } = this.props;
  //   let name;
  //   routes.map((prop) => {
  //     console.log(match);
  //     if (prop.path === location.pathname) {
  //       name = prop.navbarName;
  //     }
  //     return null;
  //   });
  //   return name;
  // }

  render() {
    const { classes, color, handleDrawerToggle } = this.props;
    const appBarClasses = classNames({
      [`${classes[color]}`]: color,
    });
    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          {/* <div className={classes.flex}>
            <div className={classes.title}>
              {this.getTitle()}
            </div>
          </div> */}
          <Hidden mdUp>
            <IconButton
              className={classes.appResponsive}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(Header);
