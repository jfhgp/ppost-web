import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';

import routes from '../constants/route-constants';
import { colors } from '../constants/colors';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import NavLinkComponents from './NavLinkComponents';
import { withStyles, IconButton, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },

  drawerPaper: {
    width: drawerWidth,
    background: colors.orangeToTop
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    color: 'inherit'
  },
  pStyle: {
    padding: '10px 20px',
    color: 'white',
    textDecoration: 'none',
    outline: 'none',
    margin: 0
  }
});

const ShowNavComponent = () => {
  return (
    <React.Fragment>
      <NavLinkComponents />
    </React.Fragment>
  );
};

const SideDrawer = props => {
  const { classes, theme } = props;
  const _1025px = useMediaQuery('(min-width:1025px)');
  let isTrue = !_1025px ? <ShowNavComponent /> : null;
  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.onClose(false)}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => props.onClose(false)}>
          {theme.direction === 'ltr' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <p
        className={classes.pStyle}
        onClick={() => props.handleLoginModalOpen(routes.typeTransporter)}
      >
        Login as Transporters
      </p>
      <p
        className={classes.pStyle}
        onClick={() => props.handleLoginModalOpen(routes.typeUser)}
      >
        Login as Customer
      </p>
      {/* <NavLinkComponent
        name="Login as Transporters"
        goto={`/${routes.login}/${routes.typeTransporter}`}
      />
      <NavLinkComponent
        name="Login as Customer"
        goto={`/${routes.login}/${routes.typeUser}`}
      /> */}
      {isTrue}
    </Drawer>
  );
};

SideDrawer.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  handleLoginModalOpen: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(SideDrawer);
