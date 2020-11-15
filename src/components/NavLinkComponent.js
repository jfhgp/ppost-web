import React from 'react';
import PropTypes from 'prop-types';

import { NavLink, withRouter } from 'react-router-dom';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const NavStyle = {
  navlinkStyle: {
    padding: '10px 20px',
    color: 'white',
    textDecoration: 'none',
    outline: 'none'
  }
};

const styles = withStyles(theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2)
  },
  popper: {
    position: 'absolute',
    top: '64px'
  },
  navLink: {
    marginRight: '10px'
  }
}));

const NavLinkComponent = props => {
  const { classes } = props;
  const [open, setOpen] = React.useState([false, false]);
  const handleOpen = index => {
    if (index === 0) {
      setOpen(() => [true, false]);
    } else {
      setOpen(() => [false, true]);
    }
  };

  const handleClose = () => {
    setOpen(() => [false, false]);
  };

  const handleNavigate = route => {
    props.history.push(`/${route}`);
  };

  if (props.subMenu) {
    return (
      <div className={classes.root}>
        <div
          className={classes.navLink}
          onMouseOver={() => handleOpen(0)}
          onMouseOut={() => handleClose()}
        >
          <NavLink
            style={NavStyle.navlinkStyle}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            to={props.goto}
          >
            {props.name}{' '}
            <span
              style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: 10 }}
            >
              &#709;
            </span>
          </NavLink>
          <Popper
            className={classes.popper}
            open={open[0]}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {props.items.map((item, i) => {
                        return (
                          <MenuItem
                            key={`submenu+${i}`}
                            onClick={() => handleNavigate(item.goto)}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
  return (
    <NavLink
      activeClassName="selected"
      activeStyle={{
        fontWeight: 'bold',
        color: 'red'
      }}
      to={props.goto}
      style={NavStyle.navlinkStyle}
    >
      {props.name}
    </NavLink>
  );
};

NavLinkComponent.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  goto: PropTypes.string,
  subMenu: PropTypes.bool,
  items: PropTypes.array,
  handleHover: PropTypes.func,
  handleLeave: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
};

export default withRouter(withStyles(styles)(NavLinkComponent));
