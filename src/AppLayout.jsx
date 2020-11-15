import React, { Component } from 'react';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import CustomerSupportChatComponent from "./components/ui/CustomerSupportChatComponent";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Collapse,
  Tooltip
} from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import withStore from './utils/store.util';
/** Auth **/
import { authClass } from './utils/auth.util';
import * as authUtil from './utils/auth.util';
/** Route Constants **/
import routes from './constants/route-constants';
/** App Layout Components **/
import AppTopBar from './components/app/AppTopBar';
import AppInlineProfile from './components/app/AppInlineProfile';

import { getMenu, getRoutes } from './constants/user-constants';
// import AppFooterComponent from './components/app/AppFooterComponent';
import ImageLightBoxComponent from './components/ImageLightBoxComponent';
import ApiCalls from './service/RequestHandler';

const drawerWidth = 260;

const appLayoutStyles = theme => ({
  tooltip: {
    fontSize: '1em'
  },
  hideTooltip: {
    color: 'transparent',
    backgroundColor: 'transparent'
  },
  root: {
    height: '100%',
    display: 'flex'
  },
  drawer: {
    color: 'white',
    background: '#fa7816',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute'
    }
  },
  drawerOpen: {
    paddingTop: 80,
    overflowX: 'hidden',
    color: 'white',
    background: '#fa7816',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    '& + $content': {
      maxWidth: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('xs')]: {
        maxWidth: `calc(100% - ${theme.spacing.unit * 7 + 5}px)`
      }
    },
    '&::-webkit-scrollbar-track': {},
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#fff',
      borderRadius: 10
    }
  },
  drawerClose: {
    paddingTop: 80,
    overflowX: 'hidden',
    color: 'white',
    background: '#fa7816',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7 + 5,
    '& + $content': {
      maxWidth: `calc(100% - ${theme.spacing.unit * 7 + 5}px)`
    },
    '&::-webkit-scrollbar-track': {},
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#fff',
      borderRadius: 10
    }
  },
  content: {
    flexGrow: 1,
    paddingTop: 80,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit * 7 + 5
    }
  },
  textColor: {
    color: '#fff',
    margin: '0px 16px',
    fontSize: '1.04rem'
  }
});

class AppLayout extends Component {
  static propTypes = {
    location: PropTypes.shape()
  };

  constructor(props) {
    super(props);
    this.state = {
      open: window.innerWidth > 500,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      location: [],
      showChat: false
    };

    this.user = authClass.getUser;
  }

  componentDidMount() {
    this.getUserCurrentLocation();
  }

  componentDidUpdate() {
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(async position => {
      await authUtil.setCurrentLocation([
        position.coords.longitude,
        position.coords.latitude
      ])
      await this.updateTransporterLocation([
        position.coords.longitude,
        position.coords.latitude
      ]);
    });
  };

  updateTransporterLocation = async loc => {
    let location = loc;
    try {
      const response = await ApiCalls.updateTransporterProfile({ location });
    } catch (error) {
      console.log(error);
    }
  };

  handleDrawer = () => {
    this.setState({ open: !this.state.open });
  };

  handleToggleChat = value => {
    this.setState({
      showChat: typeof value === 'boolean' ? value : false
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  onLogout = async () => {
    await authClass.logout();
    await authUtil.removeRatesData();
    this.props.history.push(`/${routes.home}`);
  };

  handleMultipleItemsMenuClick = e => {
    const { name } = e.currentTarget.dataset;
    this.setState(state => ({ [`is${name}Open`]: !state[`is${name}Open`] }));
  };

  handleNavClick = (e, item) => {
    if (item.disabled) {
      e.preventDefault();
    }
  };

  render() {
    const { classes } = this.props;
    const user = authClass.getUser;
    const menu = getMenu(user);
    const accessibleRoutes = getRoutes(user);

    return (
      <div className={classes.root}>
        <AppTopBar
          {...this.state}
          handleDrawer={this.handleDrawer}
          handleProfileMenuOpen={this.handleProfileMenuOpen}
          handleMenuClose={this.handleMenuClose}
          handleMobileMenuOpen={this.handleMobileMenuOpen}
          handleMobileMenuClose={this.handleMobileMenuClose}
          onLogout={this.onLogout}
        />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <List>
            <AppInlineProfile {...this.state} menuLength={menu.length} />
            {menu.map((text, index) => {
              if (text.items) {
                return (
                  <React.Fragment key={index}>
                    <Tooltip
                      title={this.state.open ? '' : text.label}
                      placement="right"
                      classes={{
                        tooltip: classes.tooltip
                      }}
                    >
                      <ListItem
                        button
                        onClick={this.handleMultipleItemsMenuClick}
                        data-name={text.dataName}
                      >
                        <ListItemIcon style={{ color: 'white' }}>
                          <img
                            alt=""
                            src={require(`./static/icons/sidebar-icons/${text.icon}.png`)}
                          />
                          {/* <i
                            className={text.icon}
                            style={{ margin: '0 8px' }}
                          ></i> */}
                        </ListItemIcon>
                        <p className={classes.textColor}>{text.label} </p>
                        {this.state[`is${text.dataName}Open`] ? (
                          <ExpandLess />
                        ) : (
                            <ExpandMore />
                          )}
                      </ListItem>
                    </Tooltip>
                    <Collapse
                      in={this.state[`is${text.dataName}Open`]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List style={{ padding: 0 }}>
                        {text.items.map((item, key) => {
                          if (item.isEmail) {
                            return (
                              <Tooltip
                                title={this.state.open ? '' : item.label}
                                placement="right"
                                key={key}
                                classes={{
                                  tooltip: classes.tooltip
                                }}
                              >
                                <a
                                  href={item.route}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ color: 'white' }}
                                  onClick={e => this.handleNavClick(e, text)}
                                  className="no-padding"
                                >
                                  <ListItem
                                    button
                                    style={{ paddingLeft: '1.8rem' }}
                                  >
                                    <ListItemIcon
                                      style={{
                                        color: 'white',
                                        marginRight: 0
                                      }}
                                    >
                                      <img
                                        alt=""
                                        src={require(`./static/icons/sidebar-icons/${item.icon}.png`)}
                                      />
                                      {/* <i
                                    className={item.icon}
                                    style={{ margin: '0 8px' }}
                                  ></i> */}
                                    </ListItemIcon>
                                    <p className={classes.textColor}>
                                      {item.label}
                                    </p>
                                  </ListItem>
                                </a>
                              </Tooltip>
                            );
                          }
                          else if (item.isChat) {
                            return (
                              <Tooltip
                                title={this.state.open ? '' : item.label}
                                placement="right"
                                key={key}
                                classes={{
                                  tooltip: classes.tooltip
                                }}
                              >
                                <a
                                  href={item.route}
                                  style={{ color: 'white' }}
                                  onClick={() => { this.handleToggleChat(item.isChat) }}
                                  className="no-padding"
                                >
                                  <ListItem
                                    button
                                    style={{ paddingLeft: '1.8rem' }}
                                  >
                                    <ListItemIcon
                                      style={{
                                        color: 'white',
                                        marginRight: 0
                                      }}
                                    >
                                      <img
                                        alt=""
                                        src={require(`./static/icons/sidebar-icons/${item.icon}.png`)}
                                      />
                                      {/* <i
                                    className={item.icon}
                                    style={{ margin: '0 8px' }}
                                  ></i> */}
                                    </ListItemIcon>
                                    <p className={classes.textColor}>
                                      {item.label}
                                    </p>
                                  </ListItem>
                                </a>
                              </Tooltip>
                            );
                          }
                          return (
                            <Tooltip
                              title={this.state.open ? '' : item.label}
                              placement="right"
                              key={key}
                              classes={{
                                tooltip: classes.tooltip
                              }}
                            >
                              <NavLink
                                activeClassName="nav-active"
                                to={item.route}
                                onClick={e => this.handleNavClick(e, item)}
                                style={{ color: 'white' }}
                                className="no-padding"
                              >
                                <ListItem
                                  button
                                  style={{ paddingLeft: '1.8rem' }}
                                >
                                  <ListItemIcon
                                    style={{ color: 'white', marginRight: 0 }}
                                  >
                                    <img
                                      alt=""
                                      src={require(`./static/icons/sidebar-icons/${item.icon}.png`)}
                                    />
                                    {/* <i
                                    className={item.icon}
                                    style={{ margin: '0 8px' }}
                                  ></i> */}
                                  </ListItemIcon>
                                  <p className={classes.textColor}>
                                    {item.label}
                                  </p>
                                </ListItem>
                              </NavLink>
                            </Tooltip>
                          );
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              }
              return (
                <Tooltip
                  title={this.state.open ? '' : text.label}
                  placement="right"
                  key={index}
                  classes={{
                    tooltip: classes.tooltip
                  }}
                >
                  <NavLink
                    activeClassName="nav-active"
                    to={text.route}
                    style={{ color: 'white' }}
                    onClick={e => this.handleNavClick(e, text)}
                  >
                    <ListItem button>
                      <ListItemIcon style={{ color: 'white' }}>
                        <img
                          alt=""
                          src={require(`./static/icons/sidebar-icons/${text.icon}.png`)}
                        />
                        {/* <i
                          className={text.icon}
                          style={{ margin: '0 8px' }}
                        ></i> */}
                      </ListItemIcon>
                      <p className={classes.textColor}>{text.label} </p>
                    </ListItem>
                  </NavLink>
                </Tooltip>
              );
            })}
          </List>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            {accessibleRoutes.map((item, i) => (
              <PrivateRoute
                key={`route-${i + 1}`}
                path={item.path}
                exact={item.exact}
                params={item.params}
                component={item.component}
              />
            ))}
            <Redirect to="/404" />
          </Switch>
        </main>
        {/* <AppFooterComponent/> */}
        <ImageLightBoxComponent />
        <CustomerSupportChatComponent
          showChat={this.state.showChat}
          handleToggleChat={this.handleToggleChat}
        />
      </div>
    );
  }
}

AppLayout.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  classes: PropTypes.shape()
};

export default withStyles(appLayoutStyles, { withTheme: true })(AppLayout);

export const PrivateRoute = ({ component: Component, params, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authClass.getUser.token ? (
          <Component {...props} params={params} />
        ) : (
            <Redirect
              to={{

                pathname: props.location ? props.location.pathname : '/home',
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

PrivateRoute.propTypes = {
  params: PropTypes.shape(),
  component: PropTypes.func,
  location: PropTypes.shape()
};
