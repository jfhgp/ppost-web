import React, { Component } from 'react';

import PropTypes from 'prop-types';

import {
  Popper,
  Paper,
  ClickAwayListener,
  Grid,
  Grow
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { authClass } from '../../utils/auth.util';
import routes from '../../constants/route-constants';

export default class LoginSignUpGrow extends Component {
  render() {
    const { boxLogin, open, anchorEl, handleLoginModalOpen } = this.props;
    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper style={{ width: 400, background: '#ebebeb' }}>
                <ClickAwayListener onClickAway={this.props.handleClose}>
                  <Grid
                    container
                    spacing={24}
                    style={{ flexGrow: 1, padding: '10px 15px' }}
                  >
                    <Grid item xs={6}>
                      {/* <Link
                        to={
                          boxLogin == 'true'
                            ? `/${routes.login}/${routes.typeUser}`
                            : '/create-account/user'
                        }
                        style={{ color: 'unset' }}
                      > */}
                      <Link
                        to={boxLogin == 'false' && '/create-account/user'}
                        onClick={
                          boxLogin == 'true' &&
                          function () {
                            return handleLoginModalOpen(routes.typeUser);
                          }
                        }
                        style={{ color: 'unset' }}
                      >
                        <div>
                          <img
                            alt="Customer"
                            src={`${process.env.PUBLIC_URL}/assets/images/icon/Icon-Customer.png`}
                          />
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >
                            <span style={{ color: 'orange' }}>
                              Customer{' '}
                              {boxLogin == 'true' ? 'Login' : 'Sign up'}
                            </span>

                            <i
                              className="fa fa-long-arrow-alt-right fa-2x"
                              style={{ color: 'darkblue', width: 30 }}
                            ></i>
                          </p>
                          <hr />
                        </div>
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      {/* <Link
                        to={
                          boxLogin == 'true'
                            ? `/${routes.login}/${routes.typeTransporter}`
                            : '/create-account/transporter'
                        }
                        style={{ color: 'unset' }}
                      > */}
                      <Link
                        to={
                          boxLogin == 'false' && '/create-account/transporter'
                        }
                        onClick={
                          boxLogin == 'true' &&
                          function () {
                            return handleLoginModalOpen(routes.typeTransporter);
                          }
                        }
                        style={{ color: 'unset' }}
                      >
                        <div>
                          <img
                            alt="Transporter"
                            src={`${process.env.PUBLIC_URL}/assets/images/icon/icon-Transporter.png`}
                          />
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}
                          >
                            <span style={{ color: 'orange' }}>
                              Transporter{' '}
                              {boxLogin == 'true' ? 'Login' : 'Sign up'}
                            </span>

                            <i
                              className="fa fa-long-arrow-alt-right fa-2x"
                              style={{ color: 'darkblue', width: 30 }}
                            ></i>
                          </p>
                          <hr />
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div >
    );
  }
}

LoginSignUpGrow.propTypes = {
  boxLogin: PropTypes.string,
  handleClose: PropTypes.func,
  handleLoginModalOpen: PropTypes.func,
  open: PropTypes.bool,
  anchorEl: PropTypes.oneOfType([PropTypes.element, PropTypes.object])
};
