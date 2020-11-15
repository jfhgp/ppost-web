import React from 'react';

import PropTypes from 'prop-types';

import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

import Button from '@material-ui/core/Button';

import LoginSignUpGrow from './ui/LoginSignUpGrow';
import { authClass } from '../utils/auth.util';
const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

class NavMenu extends React.Component {
  state = {
    boxLogin: ''
  };
  setBoxLogin = text => {
    this.setState({
      boxLogin: text
    });
  };
  render() {
    return (
      <WithState>
        {({ anchorEl, updateAnchorEl }) => {
          const open = Boolean(anchorEl);

          const handleClose = () => {
            updateAnchorEl(null);
          };

          return (
            <div>
              {/* <IconButton
              aria-owns={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
              <img
                style={{ width: '2.8rem' }}
                src={`${process.env.PUBLIC_URL}/assets/images/Slide-Icon-Top.png`}
              />
            </IconButton> */}
              {/* <span>
                <i className="fa fa-globe"></i> <span> EN</span>
              </span> */}
              <Button
                buttonRef={node => {
                  anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={event => {
                  updateAnchorEl(event.currentTarget, () =>
                    this.setBoxLogin('true')
                  );
                }}
                style={{
                  color: 'white',
                  width: 'unset',
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  textTransform: 'capitalize',
                  marginRight: '0.5rem'
                }}
              >
                Sign in
              </Button>
              <Button
                buttonRef={node => {
                  anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                variant="contained"
                onClick={event => {
                  updateAnchorEl(event.currentTarget, () =>
                    authClass.logout(),
                    this.setBoxLogin('false')
                  );
                }}
                style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem',
                  background: '#fa7816',
                  color: 'white',
                  width: 'unset',
                  textTransform: 'capitalize',
                  marginLeft: '0.5rem'
                }}
              >
                Sign up
              </Button>
              <LoginSignUpGrow
                boxLogin={this.state.boxLogin}
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleLoginModalOpen={this.props.handleLoginModalOpen}
              ></LoginSignUpGrow>
            </div>
          );
        }
        }
      </WithState >
    );
  }
}

NavMenu.propTypes = {
  handleLoginModalOpen: PropTypes.func
};

export default NavMenu;

// <Menu id="nav-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
// {[
//   {
//     name: 'Transporter Login',
//     to: `/${routes.login}/${routes.typeTransporter}`
//   },
//   {
//     name: 'Customer Login',
//     to: `/${routes.login}/${routes.typeUser}`
//   }
// ].map((item, i) => {
//   return (
//     <NavLink
//       key={i}
//       to={item.to}
//       activeClassName="active-link"
//       style={{ outline: 'none' }}
//     >
//       <MenuItem name="Transporter Login" onClick={e => handleClose(e)}>
//         {item.name}
//       </MenuItem>
//     </NavLink>
//   );
// })}
// </Menu>;
