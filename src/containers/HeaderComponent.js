import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import NavMenu from '../components/NavMenu';
import { colors } from '../constants/colors';
import SideDrawer from '../components/SideDrawer';

const ShowNavComponent = props => {
  return (
    <nav className="__navbar" style={{ display: 'flex', alignItems: 'center' }}>
      {props.children}
    </nav>
  );
};
ShowNavComponent.propTypes = {
  children: PropTypes.element
};

const HeaderComponent = props => {
  const _1025px = useMediaQuery('(min-width:1025px)');
  let isShow = _1025px ? <ShowNavComponent {...props} /> : null;
  return (
    <AppBar
      className={props.classes}
      position="fixed"
      style={{
        backgroundColor: props.headerShow ? colors.blue : 'transparent',
        boxShadow: props.headerShow ? true : 'none',
        borderBottom: !props.headerShow ? '1px solid white' : 'none',
        padding: '10px 0px'
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: 1366,
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <div className="header_logo">
            <Link to="/" style={{ outline: 'none' }}>
              <img
                alt="Link to PPost Home"
                src={`${process.env.PUBLIC_URL}/assets/images/PPost-logo-header.png`}
                style={{ maxWidth: '8rem' }}
              />
            </Link>
          </div>
          {isShow}

          {_1025px ? (
            <NavMenu handleLoginModalOpen={props.handleLoginModalOpen} />
          ) : (
            <IconButton
              aria-label="Menu"
              color="inherit"
              edge="end"
              onClick={() => props.toggleDrawer(true)}
            >
              <img
                style={{ width: '2.8rem' }}
                src={`${process.env.PUBLIC_URL}/assets/images/Slide-Icon-Top.png`}
              />
            </IconButton>
          )}

          <SideDrawer
            open={props.drawerOpen}
            onClose={val => props.toggleDrawer(val)}
            handleLoginModalOpen={props.handleLoginModalOpen}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

HeaderComponent.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  drawerOpen: PropTypes.bool,
  headerShow: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  handleLoginModalOpen: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.shape()])
};

export default HeaderComponent;
