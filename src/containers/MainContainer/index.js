// @flow
import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';

import logo from '../../logo.svg';
import DashboardRoutes, { dashboardIndexRoutes } from '../../routes/dashboard';

type Props = {
  classes: Object,
  history: Object,
  location: Object,
};

type State = {
  mobileOpen: boolean,
};

const styles = theme => ({
  wrapper: {
    position: 'relative',
    top: '0',
    height: '100vh',
  },
  mainPanel: {
    [theme.breakpoints.up('md')]: {
      width: 'calc(100% - 250px)',
    },
    overflow: 'auto',
    position: 'relative',
    float: 'right',
    transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
    maxHeight: '100%',
    width: '100%',
    overflowScrolling: 'touch',
  },
  content: {
    padding: '30px 15px',
    minHeight: 'calc(100vh - 123px)',
  },
  container: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  map: {
    marginTop: '70px',
  },
});

class MainContainer extends React.PureComponent<Props, State> {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    const { mobileOpen } = this.state;
    this.setState({ mobileOpen: !mobileOpen });
  };

  mainPanel: React.Element<'div'>;

  render() {
    const { classes, ...others } = this.props;
    const { mobileOpen } = this.state;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardIndexRoutes}
          logoText="RZ DASHBOARD"
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color="blue"
          {...others}
        />
        <div className={classes.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <DashboardRoutes />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MainContainer);
