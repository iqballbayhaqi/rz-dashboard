// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';

import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  secondaryColor,
} from '../../theme';

type Props = {
  classes: Object,
  location: Object,
  logoText: string,
  logo: string,
  routes: Array<Object>,
  open: boolean,
  handleDrawerToggle: Function,
};

const styles = theme => ({
  drawerPaper: {
    border: 'none',
    position: 'fixed',
    top: '0',
    bottom: '0',
    background: theme.palette.primary.main,
    left: '0',
    zIndex: '1',
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'fixed',
      height: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      width: drawerWidth,
      ...boxShadow,
      position: 'fixed',
      display: 'block',
      top: '0',
      height: '100vh',
      right: '0',
      left: 'auto',
      zIndex: '1032',
      visibility: 'visible',
      overflowY: 'visible',
      borderTop: 'none',
      textAlign: 'left',
      paddingRight: '0px',
      paddingLeft: '0',
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
  },
  logo: {
    position: 'relative',
    padding: '15px 15px',
    zIndex: '4',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',

      height: '1px',
      right: '15px',
      width: 'calc(100% - 30px)',
      backgroundColor: 'rgba(180, 180, 180, 0.3)',
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: 'uppercase',
    padding: '5px 0',
    display: 'block',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '30px',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    '&,&:hover': {
      color: '#FFFFFF',
    },
  },
  logoImage: {
    width: '30px',
    display: 'inline-block',
    maxHeight: '30px',
    marginLeft: '10px',
    marginRight: '15px',
  },
  img: {
    width: '35px',
    top: '22px',
    position: 'absolute',
    verticalAlign: 'middle',
    border: '0',
  },
  background: {
    position: 'absolute',
    zIndex: '1',
    height: '100%',
    width: '100%',
    display: 'block',
    top: '0',
    left: '0',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&:after': {
      position: 'absolute',
      zIndex: '3',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      background: '#000',
      opacity: '.8',
    },
  },
  list: {
    marginTop: '20px',
    paddingLeft: '0',
    paddingTop: '0',
    paddingBottom: '0',
    marginBottom: '0',
    listStyle: 'none',
    position: 'unset',
  },
  item: {
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    '&:hover,&:focus,&:visited,&': {
      color: '#FFFFFF',
    },
  },
  itemMenu: {
    backgroundColor: 'transparent',
    borderLeft: '3px solid transparent',
  },
  activeMenu: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderLeft: `3px solid ${secondaryColor}`,
  },
  itemIcon: {
    width: '24px',
    height: '30px',
    float: 'left',
    marginRight: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  itemText: {
    ...defaultFont,
    margin: '0',
    lineHeight: '30px',
    fontSize: '14px',
    color: '#FFFFFF',
  },
  whiteFont: {
    color: '#FFFFFF',
  },
  sidebarWrapper: {
    position: 'relative',
    height: 'calc(100vh - 75px)',
    overflow: 'auto',
    width: '250px',
    zIndex: '4',
    overflowScrolling: 'touch',
  },
  activePro: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      width: '100%',
      bottom: '13px',
    },
  },
});

class Sidebar extends React.PureComponent<Props> {
  // verifies if routeName is the one active (in browser input)
  checkActiveRoute = (routeName) => {
    const { location } = this.props;
    return location.pathname.indexOf(routeName) > -1;
  }

  renderLinks = () => {
    const { classes, routes } = this.props;

    /* eslint react/no-array-index-key: 0 */
    return (
      <List className={classes.list}>
        {routes.map((prop) => {
          if (prop.redirect || !prop.showInNavigation) return null;
          return (
            <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={prop.navbarName}
            >
              <ListItem button className={classNames(classes.itemMenu, this.checkActiveRoute(prop.path) && classes.activeMenu)}>
                <ListItemIcon className={classNames(classes.itemIcon, this.checkActiveRoute(prop.path) && classes.whiteFont)}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.navbarName}
                  className={classNames(classes.itemText, this.checkActiveRoute(prop.path) && classes.whiteFont)}
                  disableTypography
                />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    );
  }

  renderBrand = () => {
    const { classes, logo, logoText } = this.props;
    return (
      <div className={classes.logo}>
        <NavLink to="/" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </NavLink>
      </div>
    );
  }

  render() {
    const { classes, open, handleDrawerToggle } = this.props;

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.renderBrand()}
            <div className={classes.sidebarWrapper}>
              {this.renderLinks()}
            </div>
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {this.renderBrand()}
            <div className={classes.sidebarWrapper}>
              {this.renderLinks()}
            </div>
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
