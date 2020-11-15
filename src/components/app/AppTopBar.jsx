import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  MenuItem,
  Menu,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import classNames from 'classnames';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { authClass } from '../../utils/auth.util';
import ApiCalls from '../../service/RequestHandler';
import routes from '../../constants/route-constants';
import ProfilePictureComponent from '../dashboard-ui/ProfilePictureComponent';

const styles = theme => ({
  appBar: {
    background: '#152972',
    boxShadow: 'none',
    borderBottom: '10px solid #fa7816',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 12,
    cursor: 'pointer'
  },
  hide: {
    display: 'none'
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  sectionButton: {
    width: 50
  },
  grow: {
    flexGrow: 1
  },
  accountMenu: {
    width: 300,
    boxShadow: 'none',
    opacity: 0.9,
    border: '1px solid blue'
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  sideMenu: {
    opacity: 0.85,
    boxShadow: 'none',
    border: '1px solid green',
    top: 65,
    left: 1063,
    width: 300
  }
});

const apiCallType = {
  user: ApiCalls.updateUserProfile,
  transporter: ApiCalls.updateTransporterProfile
};

class AppTopBar extends React.Component {



  handleToggleChange = async e => {
    const { checked, name } = e.target;
    try {
      const response = await apiCallType[authClass.getUser.userType]({
        [name]: checked
      });
      await authClass.setUser(response.data);
      this.setState({});
    } catch (error) {
      // console.log(error);
    }
  };

  render() {
    const { classes, anchorEl, mobileMoreAnchorEl } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const user = authClass.getUser;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.props.handleMenuClose}
      >
        {user.userType === 'transporter' ? (
          <Link
            style={{ outline: 'none' }}
            onClick={this.props.handleMenuClose}
            to={`/${routes.typeTransporter}/${routes.profile}`}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
        ) : null}
        {user.userType === 'user' ? (
          <Link
            style={{ outline: 'none' }}
            onClick={this.props.handleMenuClose}
            to={`/${routes.typeUser}/${routes.profile}`}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
        ) : null}
        {/* <MenuItem onClick={this.props.handleMenuClose}>My account</MenuItem> */}
        {user.userType === 'transporter' ? (
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  name="available"
                  checked={user.available}
                  onChange={this.handleToggleChange}
                />
              }
              label="Available For New Orders"
              labelPlacement="start"
              className="menu-toggle"
            />
          </MenuItem>
        ) : null}
        <MenuItem onClick={this.props.onLogout}>Log out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.props.handleMenuClose}
      >
        <div
          style={{
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            fontSize: '1.3rem'
          }}
        >
          <ProfilePictureComponent
            edit={false}
            user={user}
            authClass={authClass}
            addStyle={{ width: 25, height: 25, borderRadius: "100%" }}
          />
          <span
            style={{ color: 'orange', padding: '0.5rem' }}
          >{` ${user.firstName || ''} ${user.lastName || ''}`}</span>
        </div>
        {user.userType === 'transporter' ? (
          <Link
            style={{ outline: 'none' }}
            onClick={this.props.handleMenuClose}
            to={`/${routes.typeTransporter}/${routes.profile}`}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
        ) : null}
        {user.userType === 'user' ? (
          <Link
            style={{ outline: 'none' }}
            onClick={this.props.handleMenuClose}
            to={`/${routes.typeUser}/${routes.profile}`}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
        ) : null}
        {/* <MenuItem onClick={this.props.handleMenuClose}>My account</MenuItem> */}
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                name="notifications"
                checked={user.notifications}
                onChange={this.handleToggleChange}
              />
            }
            label="Notifications"
            labelPlacement="start"
            className="menu-toggle"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                name="twoFactorLogin"
                checked={user.twoFactorLogin}
                onChange={this.handleToggleChange}
              />
            }
            label="Two Factor Authentication"
            labelPlacement="start"
            className="menu-toggle"
          />
        </MenuItem>
        {user.userType === 'transporter' ? (
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  name="available"
                  checked={user.available}
                  onChange={this.handleToggleChange}
                />
              }
              label="Available"
              labelPlacement="start"
              className="menu-toggle"
            />
          </MenuItem>
        ) : null}
        <MenuItem onClick={this.props.onLogout}>Log out</MenuItem>
      </Menu>
    );

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.open
          })}
        >
          <Toolbar disableGutters={!this.props.open}>
            <Link to="/home">
              <img
                style={{ width: 150, padding: 15 }}
                src={`${process.env.PUBLIC_URL}/assets/images/PPost-logo-header.png`}
                alt="PPOST"
              />
            </Link>
            {/* <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawer}
              className={classNames(classes.menuButton)}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            > 
              <MenuIcon />
            </IconButton>
            */}
            <img
              style={{
                width: 50,
                marginLeft: this.props.open ? 60 : 0
              }}
              src={`${process.env.PUBLIC_URL}/assets/images/Slide-Icon-Top.png`}
              alt="PPOST"
              onClick={this.props.handleDrawer}
              className={classNames(classes.menuButton)}
            />

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <p style={{ lineHeight: '26px' }}>
                Welcome
                <span style={{ color: 'orange' }}>{` ${user.firstName ||
                  ''} ${user.lastName || ''}`}</span>
              </p>

              {/* <IconButton color="inherit" className={classes.sectionButton}>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.props.handleProfileMenuOpen}
                color="inherit"
                className={classes.sectionButton}
                style={{ width: 'unset' }}
              >
                <ProfilePictureComponent
                  user={user}
                  authClass={authClass.getUser}
                  addStyle={{ width: 25, height: 25, borderRadius: "100%" }}
                />
                <ExpandMore />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.props.handleMobileMenuOpen}
                color="inherit"
                className={classes.sectionButton}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

AppTopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleMobileMenuOpen: PropTypes.func,
  handleProfileMenuOpen: PropTypes.func,
  handleDrawer: PropTypes.func,
  onLogout: PropTypes.func,
  handleMenuClose: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(AppTopBar);
